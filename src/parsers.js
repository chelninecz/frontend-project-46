import YAML from 'js-yaml';

export default (data, format) => {
  switch (format) {
    case 'yml':
    case 'yaml':
      return YAML.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};
