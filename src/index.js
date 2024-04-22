import { cwd } from 'node:process';
import fs from 'fs';
import { resolve, extname } from 'node:path';
import parseFile from './parsers.js';
import compareObjects from './compareObjects.js';
import formatter from './formatters/index.js';

const getFullFilePath = (filePath) => resolve(cwd(), filePath);

const getFileFormat = (filePath) => extname(filePath).substring(1);

const readTextFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const gendiff = (filePath1, filePath2, formatName = 'stylish') => {
  const fullPathFile1 = getFullFilePath(filePath1);
  const fullPathFile2 = getFullFilePath(filePath2);

  const fileContent1 = readTextFile(fullPathFile1);
  const fileContent2 = readTextFile(fullPathFile2);

  const fileFormat1 = getFileFormat(filePath1);
  const fileFormat2 = getFileFormat(filePath2);

  const diffInformation = compareObjects(
    parseFile(fileContent1, fileFormat1),
    parseFile(fileContent2, fileFormat2),
  );

  return formatter(diffInformation, formatName);
};

export default gendiff;
