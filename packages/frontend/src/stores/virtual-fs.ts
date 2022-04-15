import { defineStore } from 'pinia'
import { useCache } from './cache'
import { devEntries } from './config'

export type Status = 'added' | 'modified' | 'deleted' | 'untracked'

export interface VirtualFile {
  id: string
  alt?: string
  status?: Status
}

export interface VirtualFolder {
  id: string
  alt?: string
  reg: Record<string, string>
  folders: string[]
  files: string[]
  status?: Status
}

export interface VirtualFSData {
  Folders: Record<string, VirtualFolder>
  Files: Record<string, VirtualFile>
  totalStatus: {
    folder: Record<Status, number>
    file: Record<Status, number>
    line: Record<Status, number>
  }
}

export const useVirtualFS = defineStore('virtual-fs', {
  state: () => {
    return {
      Folders: {},
      Files: {},
      totalStatus: {
        folder: {
          untracked: 0,
          added: 0,
          modified: 0,
          deleted: 0,
        },
        file: {
          untracked: 0,
          added: 0,
          modified: 0,
          deleted: 0,
        },
        line: {
          untracked: 0,
          added: 0,
          modified: 0,
          deleted: 0,
        },
      },
    } as VirtualFSData
  },
  actions: {
    async init() {
      for (const id in this.Folders) {
        if (Object.prototype.hasOwnProperty.call(this.Folders, id))
          delete this.Folders[id]
      }
      for (const id in this.Files) {
        if (Object.prototype.hasOwnProperty.call(this.Files, id))
          delete this.Files[id]
      }
      const cache = useCache()
      const recursivelySetFileModeByFolderID = (id: string, status: Status) => {
        const folders = [id]
        while (folders.length > 0) {
          const pointer = folders.shift()
          if (!pointer)
            continue
          const folder = cache.Folders[pointer]
          const vFolder: VirtualFolder = {
            id: folder.id,
            reg: {},
            folders: [],
            files: [],
            status,
          }
          this.Folders[vFolder.id] = vFolder
          this.totalStatus.folder[status]++
          for (let i = 0; i < folder.folders.length; i++) {
            folders.push(folder.folders[i])
            vFolder.reg[folder.name ?? ''] = folder.folders[i]
            vFolder.folders.push(folder.folders[i])
          }
          for (let i = 0; i < folder.files.length; i++) {
            const vFile: VirtualFile = {
              id: folder.files[i],
              status,
            }
            this.Files[vFile.id] = vFile
            vFolder.reg[cache.Files[folder.files[i]].name ?? ''] = folder.files[i]
            vFolder.files.push(folder.files[i])
            this.totalStatus.file[status]++
          }
        }
      }
      const diffFolders = [[cache.Root, cache.Folders[cache.Folders[cache.Root].reg.MOD].reg.Sandbox]]
      const diffFiles = []
      while (diffFolders.length > 0) {
        const tmp = diffFolders.shift()
        if (!tmp)
          continue
        const [truePointer, fakePointer] = tmp
        const trueFolder = cache.Folders[truePointer]
        const fakeFolder = cache.Folders[fakePointer]
        const vFolder: VirtualFolder = {
          id: truePointer,
          alt: fakePointer,
          reg: {},
          folders: [],
          files: [],
        }
        this.Folders[vFolder.id] = vFolder
        // Folder
        for (let i = 0; i < trueFolder.folders.length; i++) {
          const trueID = trueFolder.folders[i]
          const trueName = cache.Folders[trueID].name ?? ''
          let found = false
          for (let j = 0; j < fakeFolder.folders.length; j++) {
            const fakeID = fakeFolder.folders[j]
            const fakeName = cache.Folders[fakeID].name ?? ''
            if (trueName && fakeName && trueName === fakeName) {
              found = true
              // Diff
              if (!devEntries.includes(trueName))
                diffFolders.push([trueID, fakeID])
              vFolder.folders.push(trueID)
              vFolder.reg[trueName] = trueID
              break
            }
          }
          if (!found) {
            // Added
            if (!devEntries.includes(trueName))
              recursivelySetFileModeByFolderID(trueID, 'added')
            vFolder.folders.push(trueID)
            vFolder.reg[trueName] = trueID
            this.totalStatus.folder.added++
          }
        }
        // File
        for (let i = 0; i < trueFolder.files.length; i++) {
          const trueID = trueFolder.files[i]
          const trueName = cache.Files[trueID].name ?? ''
          let found = false
          for (let j = 0; j < fakeFolder.files.length; j++) {
            const fakeID = fakeFolder.files[j]
            const fakeName = cache.Files[fakeID].name ?? ''
            if (trueName && fakeName && trueName === fakeName) {
              found = true
              // Diff
              diffFiles.push([trueID, fakeID])
              vFolder.files.push(trueID)
              vFolder.reg[trueName] = trueID
              break
            }
          }
          if (!found) {
            // Added
            const file: VirtualFile = {
              id: trueFolder.files[i],
              status: 'added',
            }
            vFolder.reg[cache.Files[trueFolder.files[i]].name] = file.id
            vFolder.files.push(file.id)
            this.Files[file.id] = file
            this.totalStatus.file.added++
          }
        }
        // Folder
        for (let i = 0; i < fakeFolder.folders.length; i++) {
          const fakeID = trueFolder.files[i]
          const fakeName = cache.Files[fakeID].name ?? ''
          let found = false
          for (let j = 0; j < trueFolder.folders.length; j++) {
            if (fakeName === cache.Folders[trueFolder.folders[j]].name) {
              found = true
              break
            }
          }
          if (!found) {
            // Deleted
            recursivelySetFileModeByFolderID(trueFolder.folders[i], 'deleted')
            vFolder.files.push(fakeID)
            vFolder.reg[fakeName] = fakeID
            this.totalStatus.folder.deleted++
          }
        }
        // File
        for (let i = 0; i < fakeFolder.files.length; i++) {
          const fakeID = trueFolder.files[i]
          const fakeName = cache.Files[fakeID].name ?? ''
          let found = false
          for (let j = 0; j < trueFolder.files.length; j++) {
            if (fakeName === cache.Files[trueFolder.files[j]].name) {
              found = true
              break
            }
          }
          if (!found) {
            // Deleted
            const file: VirtualFile = {
              id: fakeID,
              status: 'deleted',
            }
            vFolder.reg[fakeName] = fakeID
            vFolder.files.push(fakeID)
            this.Files[fakeID] = file
            this.totalStatus.file.deleted++
          }
        }
        console.log(this)
      }
    },
  },
})
