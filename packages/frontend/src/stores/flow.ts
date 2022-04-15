import { defineStore } from 'pinia'
import { useCache } from './cache'
import { useConfig } from './config'
import { useNative } from './native'
import { useTheme } from './theme'
import { useWorkspace } from './workspace'
import { useVirtualFS } from './virtual-fs'
export const useFlow = defineStore('flow', {
  state: () => {
    return {}
  },
  actions: {
    async hotReload() {
      const cache = useCache()
      if (cache.NeedHotReload) {
        console.log('[emm] Hot Reload.')
        if (cache.FirstRun)
          return
        const native = useNative()
        if (native.isNative()) {
          console.log('[emm] Hot Reload native.')
          const config = useConfig()
          await useTheme().update()
          if (await config.exist()) {
            await config.load()
            await useTheme().update()
            if (!(await cache.exist()))
              await cache.init()
            else await cache.load()
            const workspace = useWorkspace()
            await workspace.integrity()
            cache.WorkspaceScanned = false
            cache.VirtualFSGenerated = false
            await workspace.scan()
            cache.WorkspaceScanned = true
            await workspace.detail()
            await useVirtualFS().init()
            cache.VirtualFSGenerated = true
          }
        }
        else {
          console.log('[emm] Hot Reload Web.')
          await useTheme().update()
        }
      }
    },
  },
})
