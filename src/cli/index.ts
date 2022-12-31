#!/usr/bin/env node
import { Command } from 'commander';
import version from '../version';
import { addSearchCLI } from './search';

const program = new Command();

addSearchCLI(program);

program.version(`v${version}`, '-v, --version', 'Print the current version of jtex');
program.option('-d, --debug', 'Log out any errors to the console.');
program.parse(process.argv);
