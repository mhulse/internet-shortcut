import fs from 'fs-extra'
import shortcut from './index.js'

console.log('before\n')

const outputDir = './test-output'
await fs.emptyDir(outputDir)

const examples = [
  {
    directory: '~/Desktop/',
    name: 'test1',
    uri: 'ddd', // ❌ invalid URI
  },
  {
    directory: outputDir,
    name: '2',
    uri: 'file:///Users/mhulse/Desktop/2f5ed8331535554703.5892797.jpg',
  },
  {
    directory: outputDir,
    name: 'test3',
    uri: 'https://blah.com',
  },
]

for (const opts of examples) {
  try {
    const result = await shortcut(opts)
    console.log(`✅ Created: ${result.file}`)
    console.log(result.data.toString('utf8'))
    console.log('---')
  } catch (err) {
    console.error('❌', err.message)
  }
}

console.log('\nafter')
