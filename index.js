import * as util from './lib/util.js'

export default async (o = {}) => {
  if (!(typeof o.uri === 'string' && util.validate(o.uri))) {
    throw new TypeError(`Expected \`uri\` to be a valid string URI, got \`${o.uri}\` (${typeof o.uri})`)
  }

  if (!(o.name && o.name.toString().length)) {
    throw new TypeError(`Expected \`name\` to exist, got \`${o.name}\` (${typeof o.name})`)
  }

  if (!(typeof o.directory === 'string' && o.directory.length > 0)) {
    throw new TypeError(`Expected \`directory\` to be a string, got \`${o.directory}\` (${typeof o.directory})`)
  }

  const template = `
    [InternetShortcut]
    URL=${o.uri}
  `
    .replace(/ +/g, '')
    .trim()

  const data = Buffer.from(template)
  const file = util.joinPaths(
    util.resolvePath(o.directory),
    `${o.name}.url`
  )

  await util.writeFile(file, data)

  return {
    file,
    data,
  }
}
