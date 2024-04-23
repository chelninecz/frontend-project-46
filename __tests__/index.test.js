/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable object-curly-newline */
import genDiff from "../src/index.js";
import parseData from "../src/parsers.js";
import formatter from "../src/formatters/index.js";

describe("Nested Files Comparison", () => {
  it("should correctly identify differences in nested JSON files", () => {
    const filepath1 = "./__fixtures__/file1.json";
    const filepath2 = "./__fixtures__/file2.json";

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

  it("should correctly identify differences in nested YAML files", () => {
    const filepath1 = "./__fixtures__/file1.yml";
    const filepath2 = "./__fixtures__/file2.yml";

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

it("should correctly identify differences in nested JSON files in plain format", () => {
  const filepath1 = "./__fixtures__/file1.json";
  const filepath2 = "./__fixtures__/file2.json";

  const expectedOutput = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  const output = genDiff(filepath1, filepath2, "plain");
  expect(output).toEqual(expectedOutput);
});

it("should correctly identify differences in nested YAML files in plain format", () => {
  const filepath1 = "./__fixtures__/file1.yml";
  const filepath2 = "./__fixtures__/file2.yml";

  const expectedOutput = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  const output = genDiff(filepath1, filepath2, "plain");
  expect(output).toEqual(expectedOutput);
});

it('should correctly identify differences in nested JSON files in "json" format', () => {
  const filepath1 = "./__fixtures__/file1.yml";
  const filepath2 = "./__fixtures__/file2.yml";
  const expectedOutput = [
    {
      key: "common",
      children: [
        { key: "follow", type: "added", value: false },
        { key: "setting1", type: "unchanged", value: "Value 1" },
        { key: "setting2", type: "deleted", value: 200 },
        { key: "setting3", type: "changed", oldValue: true, newValue: null },
        { key: "setting4", type: "added", value: "blah blah" },
        { key: "setting5", type: "added", value: { key5: "value5" } },
        {
          key: "setting6",
          children: [
            {
              key: "doge",
              children: [
                {
                  key: "wow",
                  type: "changed",
                  oldValue: "",
                  newValue: "so much",
                },
              ],
              type: "nested",
            },
            { key: "key", type: "unchanged", value: "value" },
            { key: "ops", type: "added", value: "vops" },
          ],
          type: "nested",
        },
      ],
      type: "nested",
    },
    {
      key: "group1",
      children: [
        { key: "baz", type: "changed", oldValue: "bas", newValue: "bars" },
        { key: "foo", type: "unchanged", value: "bar" },
        {
          key: "nest",
          type: "changed",
          oldValue: { key: "value" },
          newValue: "str",
        },
      ],
      type: "nested",
    },
    { key: "group2", type: "deleted", value: { abc: 12345, deep: { id: 45 } } },
    {
      key: "group3",
      type: "added",
      value: { deep: { id: { number: 45 } }, fee: 100500 },
    },
  ];

  const output = genDiff(filepath1, filepath2, "json");
  const parsedOutput = JSON.parse(output);

  expect(parsedOutput).toEqual(expectedOutput);
});

describe("parseData", () => {
  it("should throw an error for unsupported formats", () => {
    const data = "some data";
    const format = "unsupported";

    expect(() => parseData(data, format)).toThrowError(
      new Error("Unsupported format: unsupported")
    );
  });
});

describe("parseData", () => {
  it("should throw an error for unsupported formats", () => {
    const formatName = "undefined";

    expect(() => formatter(formatName)).toThrowError(
      new Error(
        `The ${formatName} format is not supported.\n supported formats: stylish, plain, json`
      )
    );
  });
});
