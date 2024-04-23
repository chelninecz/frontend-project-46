import _ from 'lodash';

const spacesPerIndent = 4;
const indentCharacter = ' ';

const getIndentation = (indentLevel) => {
  const indentSize = indentLevel * spacesPerIndent;
  return indentCharacter.repeat(indentSize - 2);
};
const getIndentationPlus = (indentLevel) => {
  const indentSize = indentLevel * spacesPerIndent;
  return indentCharacter.repeat(indentSize);
};

const stringifyData = (data, indentLevel) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.entries(data).map(
    ([key, value]) => `${getIndentationPlus(indentLevel + 1)}${key}: ${stringifyData(
      value,
      indentLevel + 1,
    )}`,
  );
  return `{\n${lines.join('\n')}\n${getIndentationPlus(indentLevel)}}`;
};

const iterateNodes = (nodes, indentLevel = 1) => nodes.map((node) => {
  switch (node.type) {
    case 'deleted':
      return `${getIndentation(indentLevel)}- ${node.key}: ${stringifyData(
        node.value,
        indentLevel,
      )}`;
    case 'added':
      return `${getIndentation(indentLevel)}+ ${node.key}: ${stringifyData(
        node.value,
        indentLevel,
      )}`;
    case 'changed': {
      return `${getIndentation(indentLevel)}- ${node.key}: ${stringifyData(
        node.oldValue,
        indentLevel,
      )}\n${getIndentation(indentLevel)}+ ${node.key}: ${stringifyData(
        node.newValue,
        indentLevel,
      )}`;
    }
    case 'unchanged':
      return `${getIndentationPlus(indentLevel)}${node.key}: ${stringifyData(
        node.value,
        indentLevel,
      )}`;
    case 'nested': {
      const lines = iterateNodes(node.children, indentLevel + 1);
      return `${getIndentationPlus(indentLevel)}${node.key}: {\n${lines.join(
        '\n',
      )}\n${getIndentationPlus(indentLevel)}}`;
    }
    default:
      throw new Error(`Unknown type of node '${node.type}'.`);
  }
});

const formatStylish = (tree) => {
  const result = iterateNodes(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};

export default formatStylish;
