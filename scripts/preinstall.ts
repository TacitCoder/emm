import { run } from "./utils"

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
    await run('git', ['clone', dependencies[i].url, dependencies[i].path])
  }
}

main().catch(err => { console.error(err) })