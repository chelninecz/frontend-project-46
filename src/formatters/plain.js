import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const getFullPath = (node, currentPath) => {
  if (currentPath !== '') {
    return `${currentPath}.${node.key}`;
  }
  return String(node.key);
};

const iterateDiff = (diff, path) => diff
  .filter((node) => node.type !== 'unchanged')
  .map((node) => {
    const currentPath = getFullPath(node, path);
    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'nested':
        return iterateDiff(node.children, currentPath).join('\n');
      default:
        return null;
    }
  });

const formatPlain = (tree) => iterateDiff(tree, '').join('\n');
export default formatPlain;
