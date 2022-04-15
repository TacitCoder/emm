<script setup lang="ts">
import { useCache } from '~/stores/cache'
import { useFlow } from '~/stores/flow'
import { useVirtualFS } from '~/stores/virtual-fs'
import { useWorkspace } from '~/stores/workspace'

const router = useRouter()
const props = defineProps<{ path?: string }>()

const workspace = useWorkspace()
const cache = useCache()
const virtual = useVirtualFS()
const pathItems = computed(() => (props.path ? props.path.split('/') : []))

const displayPathItems = computed(() => (['/', ...pathItems.value.map(p => (`${p}/`))]))

const links = computed(() => {
  const base = '/explorer'
  const res: string[] = [base]
  pathItems.value.reduce((p, c) => {
    res.push(`${p}/${c}`)
    return `${p}/${c}`
  }, base)
  return res
})

onMounted(() => {
  useFlow().hotReload()
})

const currentFolder = computed(() => {
  const cache = useCache()
  if (cache.WorkspaceScanned) {
    let currentFolderId = cache.Root
    for (let i = 0; i < pathItems.value.length; i++) {
      const folder = cache.Folders[currentFolderId]
      currentFolderId = folder.reg[pathItems.value[i]]
    }
    return cache.Folders[currentFolderId]
  }
})
const currentFoldersInfo = computed(() => {
  if (!currentFolder.value)
    return
  const folders = []
  for (let i = 0; i < currentFolder.value?.folders.length; i++) {
    const id = currentFolder.value?.folders[i]
    const folder = cache.Folders[id ?? '']
    const paths: string[] = JSON.parse(JSON.stringify(pathItems.value))
    paths.push(folder.name ?? '')
    folders.push({
      folder,
      paths,
    })
  }
  return folders
})
const currentFilesInfo = computed(() => {
  if (!currentFolder.value)
    return
  const files = []
  for (let i = 0; i < currentFolder.value?.files.length; i++) {
    const id = currentFolder.value?.files[i]
    const file = cache.Files[id ?? '']
    const paths: string[] = JSON.parse(JSON.stringify(pathItems.value))
    paths.push(file.name ?? '')
    files.push({
      file,
      paths,
    })
  }
  return files
})
function push(name?: string) {
  const paths: string[] = JSON.parse(JSON.stringify(pathItems.value))
  paths.push(name ?? '')
  router.push(`/explorer/${paths.join('/')}`)
}
function open(name?: string) {
  const paths: string[] = JSON.parse(JSON.stringify(pathItems.value))
  paths.push(name ?? '')
  router.push(`/editor/${paths.join('/')}`)
}
</script>

<template lang="pug">
.explorer.grow.bg-b.text-ob
  .path.flex
    .title Explorer&nbsp;
    .path-btn.font-mono
      span(v-for="(v, i) in displayPathItems" @click="$router.push(links[i])") {{ v }}
  .content
    .flex.h-8(v-for="(v, i) in currentFoldersInfo" @click="push(v.folder.name)")
      .icon.w-8.grid.place-items-center
        .i-mdi-folder
      .name.grow.self-center.flex
        div {{ v.folder.name }}
        div {{ v.folder.id }}
        div {{ virtual.Folders[v.folder.id] }}
    .flex.h-8(v-for="(v, i) in currentFilesInfo" @click="open(v.file.name)")
      .icon.w-8.grid.place-items-center
        .i-mdi-file
      .name.grow.self-center
        div {{ v.file.name }} {{ v.file.ext }} {{ v.file.encoding }}
        div {{ virtual.Files[v.file.id] }}
</template>

<style scoped lang="stylus">

</style>

<route lang="yaml">
meta:
  layout: main
</route>
