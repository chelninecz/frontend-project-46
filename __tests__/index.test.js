import genDiff from '../src/index.js';
import parseData from '../src/parsers.js';

describe('genDiff', () => {
  it('should return correct diff for two JSON files', () => {
    const filepath1 = './__fixtures__/file1.json';
    const filepath2 = './__fixtures__/file2.json';

    const expectedOutput = `{
 - follow: false
 + follow: undefined
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;

    const output = genDiff(filepath1, filepath2);
    expect(output).toEqual(expectedOutput);
  });

  it('should return correct diff for two YAML files', () => {
    const filepath1 = './__fixtures__/file1.yml';
    const filepath2 = './__fixtures__/file2.yml';

    const expectedOutput = `{
 - follow: false
 + follow: undefined
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;

    const output = genDiff(filepath1, filepath2);
    expect(output).toEqual(expectedOutput);
  });
});

describe('parseData', () => {
  it('should throw an error for unsupported formats', () => {
    const data = 'some data';
    const format = 'unsupported';

    expect(() => parseData(data, format)).toThrowError(new Error('Unsupported format: unsupported'));
  });
});
