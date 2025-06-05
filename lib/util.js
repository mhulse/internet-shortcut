import fs from 'fs-extra'
import path from 'path'
import untildify from 'untildify'
import {parse as parseUrl} from 'url'

export function resolvePath(target) {
  return path.resolve(untildify(target))
}

export async function writeFile(target = '', file) {
  let result = false
  if (target && file) {
    try {
      await fs.outputFile(target, file)
      result = true
    } catch (err) {
      console.error(err)
      result = false
    }
  }
  return result
}

export function validate(uri) {
  const parsed = parseUrl(uri)
  return !!(parsed.protocol && parsed.protocol.length)
}

export function joinPaths(...paths) {
  return path.join(...paths)
}
