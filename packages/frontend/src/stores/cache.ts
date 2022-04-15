import { acceptHMRUpdate, defineStore } from 'pinia'
import { useNative } from './native'

const DefaultCacheName = 'Cache.json'

export interface Cache {
  NeedHotReload: boolean
  FirstRun: boolean
  WorkspaceScanned: boolean
  VirtualFSGenerated: boolean
  Root: EntryID
  Folders: Record<EntryID, Folder>
  Files: Record<EntryID, File>
}

export type EntryID = string

export interface Folder {
  id: EntryID
  name?: string
  path?: string
  parent?: EntryID
  reg: Record<string, EntryID>
  folders: EntryID[]
  files: EntryID[]
}

export interface File {
  id: EntryID
  name: string
  path: string
  parent: EntryID
  ext?: string
  description?: string
  encoding?: string
}

export const useCache = defineStore('cache', {
  state: (): Cache => {
    return {
      NeedHotReload: true,
      FirstRun: false,
      WorkspaceScanned: false,
      VirtualFSGenerated: false,
      Root: '',
      Folders: {},
      Files: {},
    }
  },
  actions: {
    async init() {
      // Touch Folder
      const native = useNative()
      if (!(await native.exist('MOD')))
        await native.createDir('MOD')

      // Overwrite File
      native.removeFile(`MOD/${DefaultCacheName}`)
      this.save()
    },
    async exist() {
      const native = useNative()
      return native.exist(`MOD/${DefaultCacheName}`)
    },
    async save() {
      const native = useNative()
      native.writeFile(
        `MOD/${DefaultCacheName}`,
        JSON.stringify({
          FirstRun: this.FirstRun,
        } as Cache),
      )
      this.NeedHotReload = false
    },
    async load() {
      const native = useNative()
      const data = JSON.parse(await native.readFile(`MOD/${DefaultCacheName}`))
      this.FirstRun = data.FirstRun
      this.NeedHotReload = false
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCache, import.meta.hot))
