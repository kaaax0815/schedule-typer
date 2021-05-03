import program from 'commander';

import About from './about';
import config from './config';
import Main from './prompt';

program
  .version(config.version)
  .description('Type Bus Schedules easier')
  .option('-A, --about', 'About')
  .option('-S, --start', 'Start the Input')
  .parse(process.argv);

const options: Options = program.opts();

if (options.about) About();

if (options.start) Main();

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

interface Options extends program.OptionValues {
  about?: boolean;
  start?: boolean;
}
