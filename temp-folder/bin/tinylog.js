import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { run } from '../src/index.js';

const argv = yargs(hideBin(process.argv))
  .usage('Usage: tinylog [options] <message>')
  .option('l', { alias: 'level', describe: 'log level (info,warn,error,debug)', type: 'string', default: 'info' })
  .option('f', { alias: 'file', describe: 'append logs to file', type: 'string' })
  .demandCommand(1, 'Message is required')
  .help()
  .argv;

const message = argv._.join(' ');
run({ message, level: argv.level, file: argv.file }).catch(err => {
  console.error('tinylog error:', err);
  process.exit(1);
});
