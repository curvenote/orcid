export const ORCID_URL = 'https://orcid.org';
const ORCID_REGEX_STRICT = '^([0-9]{4}-){3}[0-9]{3}[0-9X]$';
const ORCID_REGEX = '^((http(s)?://)?(www.)?orcid.org/)?([0-9]{4}-){3}[0-9]{3}[0-9X]$';

export type Options = {
  strict?: boolean;
};

/**
 * Validate that the input string is valid.
 *
 * @param value
 * @returns true if ORCID is valid
 */
export function validate(value?: string | null, opts?: Options): boolean {
  const match = value?.match(opts?.strict ? ORCID_REGEX_STRICT : ORCID_REGEX);
  if (!match) return false;
  return true;
}

/**
 * Normalize an input string to the ID part of an ORCID
 *
 * @param value
 * @returns a string if it is valid of the form 0000-0002-7859-8394
 */
export function normalize(value?: string | null, opts?: Options): string | undefined {
  if (!value || !validate(value, opts)) return undefined;
  return value.replace(/^(https?:\/\/)?(www\.)?orcid\.org\//, '');
}

/**
 * Builds a canonical URL pointing to https://orcid.org
 *
 * @param value
 * @returns the orcid as a url
 */
export function buildUrl(value?: string | null, opts?: Options): string | undefined {
  const orcid = normalize(value, opts);
  if (!orcid) return undefined;
  return `${ORCID_URL}/${orcid}`;
}

export const orcid = {
  validate,
  normalize,
  buildUrl,
};
