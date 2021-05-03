// Needed because of rootDir in tsconfig.json
// Cant import from package.json directly
import path from 'path';

const config = {
  name: 'schedule-typer',
  output: path.join(process.cwd(), 'dist')
};

export default config;
