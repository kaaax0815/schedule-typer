#!/usr/bin/env node
import { OptionValues, program } from 'commander';

import About from './about';
import Prompt from './prompt';

program
  .description('Type Bus Schedules easier')
  .option('-A, --about', 'About')
  .option('-S, --start [bushaltestelle]', 'Start the Input')
  .option('-F, --file <filename>', 'Specific Output', 'dist/answers.json')
  .parse(process.argv);

const options: Options = program.opts();

if (options.about) About();

if (options.start) Prompt(options.start, options.file);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

interface Options extends OptionValues {
  about?: boolean;
  start?: boolean | string;
}
