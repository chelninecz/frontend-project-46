import _ from 'lodash';

const spacesPerIndent = 4;
const indentCharacter = ' ';

const getIndentation = (indentLevel) => {
  const indentSize = indentLevel * spacesPerIndent;
  return indentCharacter.repeat(indentSize);
};

const stringifyData = (data, indentLevel) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.entries(data).map(
    ([key, value]) => `${getIndentation(indentLevel + 1)}${key}: ${stringifyData(value, indentLevel + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${getIndentation(indentLevel)}}`;
};

const iterateThroughNodes = (nodes, indentLevel = 1) => nodes.map((node) => {
  switch (node.type) {
    case 'deleted':
      return `${getIndentation(indentLevel)}- ${node.key}: ${stringifyData(node.value, indentLevel)}`;
    case 'added':
      return `${getIndentation(indentLevel)}+ ${node.key}: ${stringifyData(node.value, indentLevel)}`;
    case 'changed': {
      return `${getIndentation(indentLevel)}- ${node.key}: ${stringifyData(node.oldValue, indentLevel)}\n${getIndentation(indentLevel)}+ ${node.key}: ${stringifyData(node.newValue, indentLevel)}`;
    }
    case 'unchanged':
      return `${getIndentation(indentLevel)}${node.key}: ${stringifyData(node.value, indentLevel)}`;
    case 'nested': {
      const lines = iterateThroughNodes(node.children, indentLevel + 1);
      return `${getIndentation(indentLevel)}${node.key}: {\n${lines.join('\n')}\n${getIndentation(indentLevel)}}`;
    }
    default:
      throw new Error(`Unknown type of node '${node.type}'.`);
  }
});

const formatStylish = (tree) => {
  const result = iterateThroughNodes(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};

export default formatStylish;
