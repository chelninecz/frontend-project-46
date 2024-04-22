import genDiff from '../src/index.js';
import parseData from '../src/parsers.js';

describe('Nested Files Comparison', () => {
  it('should correctly identify differences in nested JSON files', () => {
    const filepath1 = './__fixtures__/file1.json';
    const filepath2 = './__fixtures__/file2.json';

    const expectedOutput = `{
    common: {
        + follow: false
        setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
        + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
                - wow: 
                + wow: so much
            }
            key: value
            + ops: vops
        }
    }
    group1: {
        - baz: bas
        + baz: bars
        foo: bar
        - nest: {
            key: value
        }
        + nest: str
    }
    - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
    + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

    const output = genDiff(filepath1, filepath2);
    expect(output).toEqual(expectedOutput);
  });

  it('should correctly identify differences in nested YAML files', () => {
    const filepath1 = './__fixtures__/file1.yml';
    const filepath2 = './__fixtures__/file2.yml';

    const expectedOutput = `{
    common: {
        + follow: false
        setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
        + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
                - wow: 
                + wow: so much
            }
            key: value
            + ops: vops
        }
    }
    group1: {
        - baz: bas
        + baz: bars
        foo: bar
        - nest: {
            key: value
        }
        + nest: str
    }
    - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
    + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
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
