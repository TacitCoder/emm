// import { parse, stringify } from "@iarna/toml"
import { parse, stringify } from '@ltd/j-toml'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useNative } from './native'

const DefaultConfigName = 'Config.toml'
export const devEntries = [
  'icons',
  'node_modules',
  'scripts',
  'src',
  'target',
  '.gitignore',
  '.npmrc',
  'build.rs',
  'Cargo.lock',
  'Cargo.toml',
  'package.json',
  'native.conf.json',
]
export const useConfig = defineStore('config', {
  state: (): Config => {
    return {
      Locale: 'zh-CN',
      ThemeMode: 'auto',
      ThemeColor: '#6750a4',
      Author: 'Anonymous',
      StrictAuth: true,
      IgnoreDevEntries: true,
    }
  },
  actions: {
    /**
     * When Config Related File Not exists, use me.
     */
    async init() {
      // Touch Folder
      const native = useNative()
      if (!(await native.exist('MOD')))
        await native.createDir('MOD')

      // Overwrite File
      native.removeFile(`MOD/${DefaultConfigName}`)
      this.save()
    },
    async exist() {
      const native = useNative()
      return native.exist(`MOD/${DefaultConfigName}`)
    },
    async save() {
      const native = useNative()
      native.writeFile(
        `MOD/${DefaultConfigName}`,
        stringify(
          {
            Locale: this.Locale,
            ThemeMode: this.ThemeMode,
            ThemeColor: this.ThemeColor,
            Author: this.Author,
            StrictAuth: this.StrictAuth,
          } as Config as any,
          {
            newline: '\n',
          },
        ),
      )
    },
    async load() {
      const native = useNative()
      const data = parse(await native.readFile(`MOD/${DefaultConfigName}`))
      this.Locale = data.Locale
      this.ThemeMode = data.ThemeMode
      this.ThemeColor = data.ThemeColor
      this.Author = data.Author
      this.StrictAuth = data.StrictAuth
    },
  },
})

export interface Config {
  Locale: 'en' | 'ja' | 'zh-CN' | 'zh-TW'
  ThemeMode: 'auto' | 'light' | 'dark'
  ThemeColor: string
  Author: string
  StrictAuth: boolean
  IgnoreDevEntries?: boolean
}

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useConfig, import.meta.hot))
