import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

import config from '../config';

function saveString(filename: string, data: string) {
  fs.writeFile(path.join(config.output, filename), data, (err) => {
    if (err) {
      if (err?.code === 'ENOENT') {
        mkdirp(config.output);
        saveString(filename, data);
      } else if (err) {
        throw new Error(err.message);
      } else {
        return true;
      }
    }
  });
}

export default saveString;
