import clear from 'clear';
import prompts from 'prompts';

import saveString from './utils/save';

let _count = 0;
let _bushaltestelle: prompts.Answers<string>;
const _answers: Array<string> = [];

// Gets Bushaltestelle and Starts Loop
async function Prompt() {
  clear();
  const bushaltestellen: prompts.PromptObject = {
    type: 'text',
    name: 'bushaltestelle',
    message: 'Bushaltestelle:',
    validate: validateBushaltestelle
  };
  _bushaltestelle = await prompts(bushaltestellen);
  Submit();
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
  if (answer == 'X') {
    saveAnswers();
    return;
  } else if (answer == 'N') {
    _answers.push('NULL');
  } else {
    _answers.push(answer);
  }
  Submit();
}

async function Submit() {
  await prompts(GeneratePrompts(_count), { onSubmit });
}

function saveAnswers() {
  const bushaltestelle: string = _bushaltestelle.bushaltestelle;
  const answers = _answers;
  console.log(`Bushaltestelle: ${bushaltestelle}`);
  console.log(`Answers: ${answers}`);
  const result = {
    bushaltestelle: bushaltestelle,
    zeiten: answers
  };
  saveString('answers.json', JSON.stringify(result));
}

function validateNumber(input: string) {
  if (!input) {
    return "Input can't be empty!";
  } else if (input == 'X' || input == 'N' || input == '|') {
    return true;
  } else if (!validateTime(input)) {
    return 'Not a valid time';
  } else {
    return true;
  }
}

// return true if time matches regex (HH:MMcs)
function validateTime(input: string) {
  const re = new RegExp('^([0-1][0-9]|2[0-3]):[0-5][0-9]$', 'gm');
  if (re.test(input)) {
    return true;
  }
  return false;
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

export default Prompt;
