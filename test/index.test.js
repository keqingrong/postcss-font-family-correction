const postcss = require('postcss');
const fs = require('fs');
const path = require('path');
const plugin = require('..');

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

function readFile(name) {
  return fs.readFileSync(path.resolve(__dirname, name), 'utf8');
}

function getFixtures(fixture) {
  return {
    source: readFile(`fixtures/${fixture}.css`),
    expected: readFile(`fixtures/${fixture}.expected.css`),
  };
}

test('Simple case', async () => {
  const res = getFixtures('simple');
  await run(res.source, res.expected, {});
});

test('Mixed case', async () => {
  const res = getFixtures('mixed');
  await run(res.source, res.expected, {});
});

test('Ignore case', async () => {
  const res = getFixtures('ignore');
  await run(res.source, res.expected, { preserveComments: false });
});

test('Preserve ignore case', async () => {
  const res = getFixtures('preserve-ignore');
  await run(res.source, res.expected, { preserveComments: true });
});

test('Clear font-family case', async () => {
  const res = getFixtures('clear-font-family');
  await run(res.source, res.expected, { clearFontFamily: true });
});

test('Overwrite font-weight case', async () => {
  const res = getFixtures('overwrite-font-weight');
  await run(res.source, res.expected, { overwriteFontWeight: true });
});
