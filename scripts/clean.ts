import rimraf from 'rimraf'
import { join } from 'path'
import { readdirSync } from 'fs'
import { run } from './utils'

const entriesToBeDeleted = [
  '.pnpm-debug.log',
  'pnpm-lock.yaml',
  'dependencies',
  'node_modules',
]

async function main() {
  const entries = readdirSync('packages')
  for (let i = 0; i < entries.length; i++) {
    await run('nr', ['-C', join('packages', entries[i]), 'clean'])
  }
  for (let i = 0; i < entriesToBeDeleted.length; i++) {
    rimraf(join(entriesToBeDeleted[i]), (e) => { })
  }
}

main().catch(err => { console.error(err) })
