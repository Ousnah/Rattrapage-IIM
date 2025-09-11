import { run } from '../src/index.js';
import fs from 'fs/promises';
import { existsSync } from 'fs';

const TMP = './tests/tmp-log.txt';

beforeEach(async () => {
  if (existsSync(TMP)) await fs.unlink(TMP);
});

test('run returns formatted string and writes to file', async () => {
  const msg = 'hello test';
  const out = await run({ message: msg, level: 'debug', file: TMP });
  expect(out).toMatch(/DEBUG: hello test/);
  const content = await fs.readFile(TMP, 'utf8');
  expect(content).toContain('DEBUG: hello test');
});
