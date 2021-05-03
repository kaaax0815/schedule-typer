import chalk from 'chalk';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

import config from '../config';

function saveString(filename: string, data: string) {
  const currentPath = config.currentPath;
  const fileLoc = path.join(currentPath, filename);
  const fileFolder = path.join(currentPath, filename.substring(0, filename.lastIndexOf('/')));
  fs.writeFile(fileLoc, data, (err) => {
    if (err) {
      if (err?.code === 'ENOENT') {
        mkdirp(fileFolder);
        saveString(filename, data);
      } else if (err) {
        throw new Error(err.message);
      }
    } else {
      console.log(
        `${chalk.green('√')} ${chalk.bold('Saved to:')} ${chalk.grey('...')} ${path.join(
          config.currentPath,
          filename
        )}`
      );
    }
  });
}

export default saveString;
