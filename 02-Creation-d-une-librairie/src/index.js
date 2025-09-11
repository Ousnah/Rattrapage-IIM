import fs from 'fs/promises';
import chalk from 'chalk';

const LEVELS = {
  debug: { order: 10, color: chalk.gray },
  info: { order: 20, color: chalk.white },
  warn: { order: 30, color: chalk.yellow },
  error: { order: 40, color: chalk.red }
};

function timestamp() {
  return new Date().toISOString();
}

export async function run({ message, level = 'info', file = null }) {
  const lvl = LEVELS[level] ? level : 'info';
  const colored = LEVELS[lvl].color;
  const output = `[${timestamp()}] ${lvl.toUpperCase()}: ${message}`;
  console.log(colored(output));
  if (file) {
    await fs.appendFile(file, output + '\n', 'utf8');
  }
  return output;
}
