import { cwd } from 'node:process';
import fs from 'fs';
import { resolve, extname } from 'node:path';
import parseData from './parser.js';

const getFullFilePath = (filepath) => resolve(cwd(), filepath);

const getFormat = (filepath) => extname(filepath).substring(1);

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const pathFile1 = getFullFilePath(filepath1);
  const pathFile2 = getFullFilePath(filepath2);

  const dataFile1 = readFile(pathFile1);
  const dataFile2 = readFile(pathFile2);

  const formatFile1 = getFormat(pathFile1);
  const formatFile2 = getFormat(pathFile2);

  const parsedDataFile1 = parseData(dataFile1);
  const parsedDataFile2 = parseData(dataFile2);

  console.log(parsedDataFile1, parsedDataFile2);
};

export default genDiff;
