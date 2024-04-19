import { cwd } from 'node:process';
import fs from 'fs';
import { resolve, extname } from 'node:path';
import _ from 'lodash';
import parseData from './parsers.js';

const getFullFilePath = (filepath) => resolve(cwd(), filepath);

const readFile = (filepath) => {
  const fullPath = getFullFilePath(filepath);
  const format = extname(fullPath).slice(1);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return { data, format };
};

const genDiff = (filepath1, filepath2) => {
  const { data: dataFile1, format: formatFile1 } = readFile(filepath1);
  const { data: dataFile2, format: formatFile2 } = readFile(filepath2);

  const parsedDataFile1 = parseData(dataFile1, formatFile1);
  const parsedDataFile2 = parseData(dataFile2, formatFile2);

  const allKeys = _.union(Object.keys(parsedDataFile1), Object.keys(parsedDataFile2));
  const sortedKeys = _.sortBy(allKeys);

  let output = '{\n';

  sortedKeys.forEach((key) => {
    if (parsedDataFile1[key] && !parsedDataFile2[key]) {
      output += ` - ${key}: ${parsedDataFile1[key]}\n`;
    } else if (!parsedDataFile1[key] && parsedDataFile2[key]) {
      if (parsedDataFile2[key] !== undefined) {
        output += ` + ${key}: ${parsedDataFile2[key]}\n`;
      }
    } else if (parsedDataFile1[key] !== parsedDataFile2[key]) {
      output += ` - ${key}: ${parsedDataFile1[key]}\n`;
      output += ` + ${key}: ${parsedDataFile2[key]}\n`;
    } else {
      output += `   ${key}: ${parsedDataFile1[key]}\n`;
    }
  });

  output += '}';

  return output;
};

export default genDiff;
