import assert from 'assert'
import fs from 'fs-extra'
import path from 'path'
import shortcut from './index.js'

const outputDir = './test-output'

describe('internet-shortcut', () => {
  before(async () => {
    await fs.ensureDir(outputDir)
  })

  afterEach(async () => {
    await fs.remove(outputDir)
    await fs.ensureDir(outputDir)
  })

  it('creates a .url file with valid input', async () => {
    const result = await shortcut({
      directory: outputDir,
      name: 'test-basic',
      uri: 'https://example.com',
    })
    const expectedPath = path.resolve(outputDir, 'test-basic.url')
    assert.strictEqual(result.file, expectedPath)
    const exists = await fs.pathExists(result.file)
    assert.ok(exists, 'Shortcut file should exist')
    const content = await fs.readFile(result.file, 'utf8')
    assert.match(content, /\[InternetShortcut\]/)
    assert.match(content, /URL=https:\/\/example\.com/)
  })

  it('throws on missing uri', async () => {
    await assert.rejects(
      shortcut({
        directory: outputDir,
        name: 'missing-uri',
      }),
      {
        name: 'TypeError',
        message: /Expected `uri` to be a valid string URI/,
      }
    )
  })

  it('throws on missing name', async () => {
    await assert.rejects(
      shortcut({
        directory: outputDir,
        uri: 'https://example.com',
      }),
      {
        name: 'TypeError',
        message: /Expected `name` to exist/,
      }
    )
  })

  it('throws on invalid directory', async () => {
    await assert.rejects(
      shortcut({
        directory: null,
        name: 'bad-dir',
        uri: 'https://example.com',
      }),
      {
        name: 'TypeError',
        message: /Expected `directory` to be a string/,
      }
    )
  })
})
