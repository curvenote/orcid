import { Command } from 'commander';
import type { ISession } from 'myst-cli-utils';
import { clirun, getSession } from 'myst-cli-utils';
import chalk from 'chalk';
import fetch from 'node-fetch';
import orcid, { ORCID_URL } from '..';

type OpenAlexQueryResult = {
  id: string;
  display_name: string;
  hint: string;
  cited_by_count: number;
  works_count: number;
  entity_type: 'work' | 'author' | 'venue' | 'institution' | 'concepts';
  external_id: string | null;
};

type Author = {
  id: string;
  orcid: string | null;
  display_name: string;
  display_name_alternatives: [];
  works_count: number;
  cited_by_count: number;
  ids: {
    openalex: string;
    orcid: string;
    mag: string;
  };
  last_known_institution: null | {
    id: string;
    ror: string;
    display_name: string;
    country_code: string;
    type: string;
  };
  x_concepts: {
    id: string;
    wikidata: string;
    display_name: string;
    level: number;
    score: number;
  }[];
  counts_by_year: { year: number; works_count: number; cited_by_count: number }[];
  works_api_url: string;
  updated_date: string;
  created_date: string;
};

async function fetchAuthor(session: ISession, id: string): Promise<Author> {
  const url = id.replace('https://openalex.org', 'https://api.openalex.org');
  session.log.debug(`Fetching information from ${url}`);
  const resp = await fetch(url);
  const data = (await resp.json()) as Author;
  return data;
}

export async function checkTemplate(session: ISession, name: string) {
  const url = `https://api.openalex.org/autocomplete/authors?q=${name}`;
  session.log.debug(`Fetching query from ${url}`);
  const resp = await fetch(url);
  const data = (await resp.json()) as { results: OpenAlexQueryResult[] };
  session.log.debug(JSON.stringify(data, null, 2));
  const relevant = data.results.filter(({ external_id }) => external_id?.includes(ORCID_URL));
  if (relevant.length === 0) {
    session.log.warn(`Did not find any results for query "${name}".`);
    return;
  }
  const authors = await Promise.all(
    relevant.map(async (r) => {
      const author = await fetchAuthor(session, r.id);
      return { author, query: r };
    }),
  );
  session.log.info(
    chalk.dim(
      `Found ${authors.length} result${
        authors.length > 1 ? 's' : ''
      } for "${name}" with an ORCID:\n`,
    ),
  );
  authors.forEach((result) => {
    session.log.info(`${chalk.green.bold(result.author.display_name)}`);
    session.log.info(`${chalk.blue.bold(orcid.normalize(result.author.orcid))}`);
    session.log.info(`  Hint: ${chalk.dim(result.query.hint)}`);
    session.log.info(
      `  Last Institution: ${chalk.dim(
        result.author.last_known_institution?.display_name ?? 'Unknown',
      )}`,
    );
    session.log.info(
      `  Concepts: ${chalk.dim(
        result.author.x_concepts
          .map((c) => c.display_name)
          .slice(0, 10)
          .join(', '),
      )}`,
    );
  });
}

function makeSearchCLI(program: Command) {
  const command = new Command('search')
    .description('Check that a template passes validation')
    .argument('<name>', 'Path to the template directory')
    .action(clirun(checkTemplate, { program, getSession }));
  return command;
}

export function addSearchCLI(program: Command) {
  program.addCommand(makeSearchCLI(program));
}
