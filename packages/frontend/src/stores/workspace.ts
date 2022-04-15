import { acceptHMRUpdate, defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import { native } from '@native-apps/api'
import { useCache } from './cache'
import type { EntryID, File, Folder } from './cache'
import type { FileEntry } from './native'
import { useNative } from './native'
export type FileStatus = 'added' | 'modified' | 'deleted' | 'untracked'

export const useWorkspace = defineStore('workspace', {
  state: () => {
    return {}
  },
  actions: {
    async scan() {
      const native = useNative()
      const cache = useCache()
      const raw = await useNative().readDir(undefined, true)
      async function scanFolder(entries: FileEntry[], folder: Folder) {
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i]
          entry.path = await native.normalize(entry.path)
          const id = nanoid()
          folder.reg[entry.name ?? ''] = id
          if (Object.prototype.hasOwnProperty.call(entry, 'children')) {
            // Folder
            folder.folders.push(id)
            cache.Folders[id] = {
              id,
              name: entry.name,
              path: entry.path,
              parent: folder.id,
              reg: {},
              folders: [],
              files: [],
            }
            scanFolder(entry.children ?? [], cache.Folders[id])
          }
          else {
            // File
            folder.files.push(id)
            cache.Files[id] = {
              id,
              name: entry.name ?? '',
              path: entry.path,
              parent: folder.id,
            }
          }
        }
        cache.Folders[folder.id] = folder
      }
      const id = nanoid()
      cache.Root = id
      const root: Folder = {
        id,
        reg: {},
        folders: [],
        files: [],
      }
      await scanFolder(raw, root)
      cache.WorkspaceScanned = true
    },
    async integrity() {
      const native = useNative()
      const folders = [
        'MOD/Downloads',
        'MOD/Mods',
        'MOD/Packages',
        'MOD/Recipes',
        'MOD/Sandbox',
        'MOD/Temp',
      ]
      for (let i = 0; i < folders.length; i++) {
        if (!await native.exist(folders[i]))
          await native.createDir(folders[i])
      }
    },
    async detail() {
      const cache = useCache()
      const native = useNative()
      const folders = [cache.Root]
      while (folders) {
        const currentFolderID = folders.shift()
        if (!currentFolderID)
          break
        const currentFolder = cache.Folders[currentFolderID]
        for (let i = 0; i < currentFolder.folders.length; i++)
          folders.push(currentFolder.folders[i])

        for (let i = 0; i < currentFolder.files.length; i++) {
          const file = cache.Files[currentFolder.files[i]]
          // console.log(file.path);
          try {
            // console.log(await native.extname(file.path));
            file.ext = await native.extname(file.path)
          }
          catch (e) { }
          if (!file.ext)
            continue
          if (['config', 'csv', 'erh', 'erb'].includes(file.ext))
            file.encoding = await native.guess(file.path) as string
        }
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWorkspace, import.meta.hot))
