import genDiff from '../src/index.js';

describe('genDiff', () => {
  it('should return correct diff for two JSON files', () => {
    const filepath1 = './__fixtures__/file1.json';
    const filepath2 = './__fixtures__/file2.json';

    const expectedOutput = `{
  - follow: false,
    host: "hexlet.io",
  - proxy: "123.234.53.22",
  - timeout: 50,
  + timeout: 20,
  + verbose: true
}`;

    const output = genDiff(filepath1, filepath2);
    expect(output).toEqual(expectedOutput);
  });

  //   it('should handle files with no differences', () => {
  //     const filepath1 = './__fixtures__/file3.json';
  //     const filepath2 = './__fixtures__/file3.json';

  //     const expectedOutput = `{
  //     host: hexlet.io
  //     timeout: 50
  //    }`;

  //     const output = genDiff(filepath1, filepath2);
  //     expect(output).toEqual(expectedOutput);
  //   });

  //   it('should handle files with all keys in one file', () => {
  //     const filepath1 = './__fixtures__/file4.json';
  //     const filepath2 = './__fixtures__/file5.json';

  //     const expectedOutput = `{
  //     + verbose: true
  //    }`;

  //     const output = genDiff(filepath1, filepath2);
  //     expect(output).toEqual(expectedOutput);
  //   });

  //   it('should handle files with all keys in the other file', () => {
  //     const filepath1 = './__fixtures__/file5.json';
  //     const filepath2 = './__fixtures__/file4.json';

  //     const expectedOutput = `{
  //     - verbose: true
  //    }`;

//     const output = genDiff(filepath1, filepath2);
//     expect(output).toEqual(expectedOutput);
//   });
});
