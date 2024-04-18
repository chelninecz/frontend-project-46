import { cwd } from 'node:process';
import fs from 'fs';
import { resolve } from 'node:path';
import _ from 'lodash';
import parsesFile from './parser.js';

const getFullFilePath = (filepath) => resolve(cwd(), filepath);

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const pathFile1 = getFullFilePath(filepath1);
  const pathFile2 = getFullFilePath(filepath2);

  const dataFile1 = readFile(pathFile1);
  const dataFile2 = readFile(pathFile2);

  const parsedDataFile1 = parsesFile(dataFile1);
  const parsedDataFile2 = parsesFile(dataFile2);

  const allKeys = _.union(Object.keys(parsedDataFile1), Object.keys(parsedDataFile2));

  const sortedKeys = _.sortBy(allKeys);

  const result = {};

  sortedKeys.forEach((key) => {
    if (parsedDataFile1[key] && !parsedDataFile2[key]) {
      result[`- ${key}`] = parsedDataFile1[key];
    } else if (!parsedDataFile1[key] && parsedDataFile2[key]) {
      result[`+ ${key}`] = parsedDataFile2[key];
    } else if (parsedDataFile1[key] !== parsedDataFile2[key]) {
      result[`- ${key}`] = parsedDataFile1[key];
      result[`+ ${key}`] = parsedDataFile2[key];
    } else {
      result[`  ${key}`] = `${parsedDataFile1[key]}`;
    }
  });

  const jsonString = JSON.stringify(result, null, 2);
  const output = jsonString.replace(/"([^"]+)":/g, '$1:');

  return output;
};

export default genDiff;
