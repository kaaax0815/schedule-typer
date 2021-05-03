import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

export default function About() {
  clear();
  const kaaaxcreators = figlet.textSync('kaaaxcreators');
  console.log(chalk.bgBlue.black(kaaaxcreators));
  console.log(`--- schedule-typer ---`);
  console.log('Author: Bernd Storath <bernd@kaaaxcreators.de>');
}
