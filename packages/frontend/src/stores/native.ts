import { defineStore } from 'pinia'
export type { FileEntry } from '@tauri-apps/api/fs'

export const useNative = defineStore('native', {
  state: () => {
    return {}
  },
  actions: {
    isNative() {
      return Object.prototype.hasOwnProperty.call(globalThis, '__TAURI__')
    },
    async setSize(width: number, height: number) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/window')
        return (await api).appWindow.setSize(
          new (await api).LogicalSize(width, height),
        )
      }
      else {
        // document.documentElement.style.width = `${width}px`;
        // document.documentElement.style.height = `${height}px`;
      }
    },
    async close() {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/window');
        (await api).appWindow.close()
      }
    },
    async show() {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/window');
        (await api).appWindow.show()
      }
    },
    async center() {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/window')
        return (await api).appWindow.center()
      }
    },
    /**
     * `''`: `''`
     *
     * `'.'`: `'.'`
     *
     * `'./'`: `'\'`
     *
     * `'.\'`: `'\'`
     *
     * `'/'`: `'\\'`
     *
     * `'\'`: `'\\'`
     *
     * `'./MOD'`: `'MOD'`
     *
     * `'.\MOD'`: `'MOD'`
     *
     * `'/MOD'`: `'\MOD'`
     *
     * `'\MOD'`: `'\MOD'`
     * @param path
     * @returns
     */
    async normalize(path: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/path')
        return (await api).normalize(path)
      }
      else {
        const api = import('path')
        return (await api).normalize(path)
      }
    },
    async exist(path: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/tauri')
        return (await api).invoke('exist', { path })
      }
      else {
        // const pathAPI = import("path");
        // return (await pathAPI).normalize(path);
      }
    },
    async join(...path: string[]) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/path')
        return (await api).join(...path)
      }
    },
    async dirname(path: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/path')
        return (await api).dirname(path)
      }
      else {
        const api = import('path')
        return (await api).dirname(path)
      }
    },
    async createDir(path: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/fs')
        return (await api).createDir(path)
      }
    },
    async removeDir(path: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/fs')
        return (await api).removeDir(path)
      }
    },
    async removeFile(path: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/fs')
        return (await api).removeFile(path)
      }
    },
    async readFile(path: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/fs')
        return (await api).readTextFile(path)
      }
      else { return path }
    },
    async writeFile(path: string, contents: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/fs')
        return (await api).writeFile({ path, contents })
      }
      else { return path }
    },
    async basename(path: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/path')
        return (await api).basename(path)
      }
      else { return path }
    },
    async readDir(path?: string, recursive = false) {
      if (this.isNative()) {
        if (!path)
          path = ''
        const api = import('@tauri-apps/api/fs')
        return (await api).readDir(path, { recursive })
      }
      else { return [] }
    },
    async watch(path: string, recursive: boolean, callback: any) {
      if (this.isNative()) {
        const api = import('tauri-plugin-fs-watch-api')
        return (await api).watch(path, { recursive }, callback)
      }
      else { return [] }
    },
    async extname(path: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/path')
        return (await api).extname(path)
      }
      else { return '' }
    },
    async guess(path: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/tauri')
        return (await api).invoke('guess', { path })
      }
      else { return '' }
    },
    async cleanDir(path: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/tauri')
        return (await api).invoke('clean_dir', { path })
      }
      else { return '' }
    },
    async archive(source: string, target: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/tauri')
        return (await api).invoke('archive', { source, target })
      }
      else { return '' }
    },
    async extract(source: string, target: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/tauri')
        return (await api).invoke('extract', { source, target })
      }
      else { return '' }
    },
    async extractFileFromFile(source: string, path: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/tauri')
        return (await api).invoke('extract', { source, path })
      }
      else { return '' }
    },
    async copy(source: string, target: string) {
      if (this.isNative()) {
        const api = import('@tauri-apps/api/tauri')
        return (await api).invoke('copy', { source, target })
      }
      else { return '' }
    },
  },
})
