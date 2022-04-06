import semver from 'semver'
import { execa } from 'execa'
import chalk from 'chalk'
import { version as currentVersion } from '../package.json'
import path from 'path'
import fs from 'fs'
import { prompt } from 'enquirer'
import { run } from './utils'

async function bumpVersion() {
  // Before Public Testing:
  // Prerelease
  // alpha: Free Development
  // beta: Feature Freeze / Optimization
  // rc: Test & Fix
  // Version
  // 0.0.1: Free Development with No Public Testing
  // 0.1.0: Public Testing
  // 1.0.0: Public Release
  // Public Testing:

  // bump: 
  const v = semver.parse(currentVersion)

  const { bumpType }: Record<string, string> = await prompt({
    name: 'bumpType', type: 'select', message: 'Select Release Type', choices: [
      { name: 'bump', hint: 'Keep Current & +1' },
      { name: 'prerelease', hint: 'Enter Prerelease Mode for Next Release' },
      { name: 'next', hint: 'Next Level: alpha -> beta -> rc -> Exit Prerelease Mode' },
      { name: 'patch', hint: 'Exit Prerelease Mode & Patch +1' },
      { name: 'minor', hint: 'Exit Prerelease Mode & Minor +1' },
      { name: 'major', hint: 'Exit Prerelease Mode & Major +1' },
    ]
  })

  let nv = ''

  switch (bumpType) {
    case 'bump':
      if (v.prerelease.length) {
        nv = semver.inc(v, "prerelease")
      } else {
        nv = semver.inc(v, 'patch')
      }
      break;
    case 'prerelease':
      nv = semver.inc(v, 'prerelease')
      break;
    case 'next':
      if (v.prerelease.length) {
        if (v.prerelease[0] === 'alpha')
          nv = semver.inc(v, 'prerelease', false, 'beta')
        else if (v.prerelease[0] === 'beta')
          nv = semver.inc(v, 'prerelease', false, 'rc')
        else if (v.prerelease[0] === 'rc')
          nv = semver.inc(v, 'patch')
      }
      break;
    case 'patch':
      nv = semver.inc(v, 'patch')
      break;
    case 'minor':
      nv = semver.inc(v, 'minor')
      break;
    case 'major':
      nv = semver.inc(v, 'major')
      break;
    default:
      break;
  }

  const pkg = JSON.parse(fs.readFileSync('../package.json', { encoding: "utf8" }))
  pkg.version = nv
  fs.writeFileSync('../package.json', JSON.stringify(pkg))
}

async function main() {
  await bumpVersion()
}

main().catch(err => { console.error(err) })