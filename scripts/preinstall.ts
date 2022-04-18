import { writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import fetch from 'node-fetch'
import { path7za } from '7zip-bin'
import { run } from './utils'

const dependencies = [
  {
    url: 'https://github.com/tauri-apps/tauri-plugin-fs-extra',
    path: 'dependencies/tauri-plugin-fs-extra',
  },
  {
    url: 'https://github.com/tauri-apps/tauri-plugin-fs-watch',
    path: 'dependencies/tauri-plugin-fs-watch',
  },
  {
    url: 'https://github.com/tauri-apps/tauri-plugin-log',
    path: 'dependencies/tauri-plugin-log',
  },
  {
    url: 'https://github.com/tauri-apps/tauricon',
    path: 'dependencies/tauricon',
  },
]

async function main() {
  for (let i = 0; i < dependencies.length; i++) {
    if (!existsSync(dependencies[i].path))
      run('git', ['clone', dependencies[i].url, dependencies[i].path])
  }
  const url = 'https://mirrors.tuna.tsinghua.edu.cn/github-release/be5invis/Sarasa-Gothic/LatestRelease/'
  let res = await fetch(url)
  const html = await res.text()
  const fontFileName = html.match(/sarasa-gothic-ttf-\d+\.\d+\.\d+\.7z/)[0]
  const fontUrl = url + fontFileName
  res = await fetch(fontUrl)
  await writeFile('dependencies/sarasa-gothic-ttf.7z', res.body)
  await run(path7za, ['e', 'dependencies/sarasa-gothic-ttf.7z', '-i!sarasa-mono-sc-regular.ttf', '-odependencies/'])
}

main().catch((err) => { console.error(err) })
