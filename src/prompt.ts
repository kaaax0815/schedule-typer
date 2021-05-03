import chalk from 'chalk';
import clear from 'clear';
import prompts from 'prompts';

import saveString from './utils/save';

let _count = 0;
let _bushaltestelle: string;
let _filename: string;
const _answers: Array<string> = [];

// Gets Bushaltestelle and Starts Loop
async function Prompt(bushaltestelle: string | boolean, filename: string) {
  clear();
  _filename = filename;
  // if argument is boolean ask for bushaltestelle otherwise get it from argument
  if (typeof bushaltestelle === 'boolean') {
    const bushaltestelleprompt: prompts.PromptObject = {
      type: 'text',
      name: 'bushaltestelle',
      message: 'Bushaltestelle:',
      validate: validateBushaltestelle
    };
    _bushaltestelle = (await prompts(bushaltestelleprompt)).bushaltestelle;
    if (_bushaltestelle) Submit();
  } else {
    _bushaltestelle = bushaltestelle;
    Submit();
  }
}

function GeneratePrompts(id: number): prompts.PromptObject {
  return {
    type: 'text',
    name: `number${id}`,
    message: `Number:`,
    validate: validateNumber
  };
}

// OnSubmit increase id and ask again
function onSubmit(prompt: prompts.PromptObject, answer: string) {
  _count++;
  if (answer.toUpperCase() == 'X') {
    saveAnswers();
    return;
  } else if (answer.toUpperCase() == 'N') {
    _answers.push('NULL');
  } else {
    // replace , with ; (HH,MM -> HH:MM)
    answer = answer.replace(',', ':');
    _answers.push(answer);
  }
  Submit();
}

function onCancel() {
  console.log(`${chalk.red('×')} ${chalk.bold('Quitting:')} ${chalk.grey('...')}`);
  saveAnswers();
}

async function Submit() {
  await prompts(GeneratePrompts(_count), { onSubmit, onCancel });
}

function saveAnswers() {
  const bushaltestelle = _bushaltestelle;
  const answers = _answers;
  const result = {
    bushaltestelle: bushaltestelle,
    zeiten: answers
  };
  saveString(_filename, JSON.stringify(result));
}

function validateBushaltestelle(input: string) {
  if (!input) {
    return "Input can't be empty!";
  } else if (!isNaN(Number(input))) {
    return "Input can't be a number!";
  } else {
    return true;
  }
}

function validateNumber(input: string) {
  if (!input) {
    return "Input can't be empty!";
  } else if (
    input.toUpperCase() == 'X' ||
    input.toUpperCase() == 'N' ||
    input.toUpperCase() == '|'
  ) {
    return true;
  } else if (!validateTime(input)) {
    return 'Not a valid time (HH,MM)';
  } else {
    return true;
  }
}

// return true if time matches regex (HH,MM)
function validateTime(input: string) {
  const re = new RegExp('^([0-1][0-9]|2[0-3]),[0-5][0-9]$', 'gm');
  if (re.test(input)) {
    return true;
  }
  return false;
}

export default Prompt;
