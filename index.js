const util = require('./lib/utility');

module.exports = async (o = {}) => {

  if ( ! ((typeof o.uri === 'string') && util.validate(o.uri))) {
    throw new TypeError(`Expected \`url\` to be a string and a valid URI, got \`${o.uri}\` (${typeof o.uri})`);
  }

  if ( ! (o.name && o.name.toString().length)) {
    throw new TypeError(`Expected \`name\` to exist, got \`${o.name}\` (${typeof o.name})`);
  }

  if ( ! ((typeof o.directory === 'string') && (o.directory.length > 0) && (await util.makeDir(o.directory)))) {
    throw new TypeError(`Expected \`directory\` to be a string and resolve to a path that can be created programmatically, got \`${o.directory}\` (${typeof o.directory})`);
  }

  const template = `
    [InternetShortcut]
    URL=${o.uri}
  `
    .replace(/ +/g, '')
    .trim();

  const data = Buffer.from(template);

  await util.writeFile(
    util.joinPaths(o.directory, `${o.name}.url`),
    data
  );

  return data;

};
