<script setup lang="ts">
import { Section, commentFor, commentForThis, stringify } from '@ltd/j-toml'
import { useCache } from '~/stores/cache'
import { useFlow } from '~/stores/flow'
import { useNative } from '~/stores/native'
import { useVirtualFS } from '~/stores/virtual-fs'

const cache = useCache()
const virtual = useVirtualFS()

const showMarkGuide = ref(false)
const mde = ref()

onMounted(() => {
  useFlow().hotReload()
})

async function submit() {
  const native = useNative()
  // Clear Temp
  await native.cleanDir('MOD/Temp')

  // Copy Change to Temp
  for (const id in virtual.Files) {
    if (Object.prototype.hasOwnProperty.call(virtual.Files, id)) {
      const file = cache.Files[id]
      await native.copy(file.path, await native.join('MOD/Temp', file.path) ?? '')
    }
  }
  // Generate Meta File
  await native.writeFile('MOD/Temp/Meta.toml', stringify({
    package: Section({
      [commentForThis]: '(Required)',
      name: 'Display Name',
      [commentFor('name')]: '(Optional) Name for display.',
      id: 'unique-id',
      [commentFor('id')]: '(Required) Unique ID for recognize.',
      version: '0.1.0',
      [commentFor('version')]: '(Required) Semver.',
      description: 'Description for package.',
      [commentFor('description')]: '(Optional)',
      author: 'Anonymous <anonymous@mail.com>',
      [commentFor('author')]: '(Optional) Author Name for display.',
      authorID: 'anonymous',
      [commentFor('authorID')]: '(Optional) Author\'s Unique ID.',
    }),
    scripts: Section({
      [commentForThis]: '(Optional)',
    }),
    dependencies: Section({
      [commentForThis]: '(Optional)',
    }),
  }, { newline: '\n' }),
  )
  await native.archive('MOD/Temp', 'MOD/Packages/Temp.zip')
  await native.cleanDir('MOD/Temp')
  showMarkGuide.value = false
}
</script>

<template lang="pug">
.recipe.grow.bg-b.text-ob.flex.relative
  .recipe-container.flex.grow
    .recipe-list.grow
      .surface.m-4.p-4.bg-pc.text-opc.rounded.flex
        .grid.grid-cols-1.text-center.mr-4
          .i-mdi-chevron-up
          .num 1
          .i-mdi-chevron-down
        .info
          .font-bold.text-xl Name
          .text-sm v0.1.0
        .grow
        .grid.grid-cols-4.items-center
          .i-mdi-folder-plus
          .text {{ virtual.totalStatus.folder.added }}
          .i-mdi-folder-remove
          .text {{ virtual.totalStatus.folder.deleted }}
          .i-mdi-file-plus
          .text {{ virtual.totalStatus.file.added }}
          .i-mdi-file-remove
          .text {{ virtual.totalStatus.file.deleted }}
          .i-mdi-playlist-plus
          .text {{ virtual.totalStatus.folder.added }}
          .i-mdi-playlist-remove
          .text {{ virtual.totalStatus.folder.added }}
      .grid.grid-cols-2.m-4.gap-4
        .surface.p-8.bg-pc.text-opc.rounded.grid.place-items-center
          .center-group.flex.items-center
            .i-mdi-plus
            .text 导入新的变更（字典）
        .surface.p-4.bg-pc.text-opc.rounded.flex(@click="showMarkGuide = true")
          .info.grow.grid.place-items-center
            .center-group.flex.items-center
              .i-mdi-playlist-edit
              .text 标记现有变更
          .grid.grid-cols-4.items-center
            .i-mdi-folder-plus
            .text {{ virtual.totalStatus.folder.added }}
            .i-mdi-folder-remove
            .text {{ virtual.totalStatus.folder.deleted }}
            .i-mdi-file-plus
            .text {{ virtual.totalStatus.file.added }}
            .i-mdi-file-remove
            .text {{ virtual.totalStatus.file.deleted }}
            .i-mdi-playlist-plus
            .text {{ virtual.totalStatus.folder.added }}
            .i-mdi-playlist-remove
            .text {{ virtual.totalStatus.folder.added }}
    .detail.w-100.grid.grid-cols-1
      .data 123
      .md(ref="mde")
  .modal.absolute.top-0.bottom-0.left-0.right-0.backdrop-filter.backdrop-blur.backdrop-brightness-80.grid.place-items-center(v-if="showMarkGuide" @click.self="showMarkGuide = false")
    .center-group.bg-sc.text-osc.rounded.p-8
      h1 变更标记向导
      div(v-for="v in virtual.Files") {{ cache.Files[v.id].name }} {{ cache.Files[v.id].path }}
      .grid.grid-cols-2.gap-y-2
        label Package Name:
        input(placeholder="Package Name")
        label Package ID:
        input(placeholder="package-id")
        label Version:
        input(placeholder="0.0.0")
      .btn(@click="submit") Submit
  //- .surface
  //-   .container
  //-   .state
  //-   .content
  //-   div(v-for="(v, i) in virtual.Folders") {{ cache.Folders[v.id].name }}
  //-   div(v-for="(v, i) in virtual.Files" :class="{ 'text-p': v.status === 'added' }") {{ cache.Files[v.id].name }}
</template>

<style scoped lang="stylus">
</style>

<route lang="yaml">
meta:
  layout: main
</route>
