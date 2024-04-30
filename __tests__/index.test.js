import url from 'url';
import path, { dirname } from 'node:path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFilePath = (filename) => getFixturePath(filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileOutputDefault = readFixture('output_stylish.txt');
const fileOutputPlain = readFixture('output_plain.txt');
const fileOutputJson = readFixture('output_json.txt');

const extensions = ['yml', 'json'];

describe('comparing files', () => {
  test.each(extensions)('simple using with extension %s', (ext) => {
    const fileBefore = getFilePath(`file1.${ext}`);
    const fileAfter = getFilePath(`file2.${ext}`);

    expect(gendiff(fileBefore, fileAfter)).toEqual(fileOutputDefault);
    expect(gendiff(fileBefore, fileAfter, 'plain')).toEqual(fileOutputPlain);
    expect(gendiff(fileBefore, fileAfter, 'json')).toEqual(fileOutputJson);
  });
});
