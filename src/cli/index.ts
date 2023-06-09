#!/usr/bin/env node
import { Command } from 'commander';
import version from '../version.js';
import { addSearchCLI } from './search.js';

const program = new Command();

addSearchCLI(program);

program.version(`v${version}`, '-v, --version', 'Print the current version of orcid');
program.option('-d, --debug', 'Log out any errors to the console.');
program.parse(process.argv);
