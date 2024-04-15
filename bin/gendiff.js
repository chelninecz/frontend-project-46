#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .version('0.0.2', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>');

if (process.argv.includes('-h') || process.argv.includes('--help')) {
  program.help();
} else {
  program.parse(process.argv);
}

if (program.args.length < 2) {
  console.error('Error: Missing required arguments.');
  program.help();
}
