<script setup lang="ts">
import { appWindow } from '@tauri-apps/api/window'
import { onMounted, ref } from 'vue'

const isMaximized = ref(false)

onMounted(() => {
  appWindow.isMaximized().then((res) => {
    isMaximized.value = res
  })
})

async function toggleMaximize() {
  await appWindow.toggleMaximize()
  isMaximized.value = await appWindow.isMaximized()
}
</script>

<template lang="pug">
header.title-bar.flex.bg-p40.text-p100.h-8
  .btn.menu.min-w-8.grid.place-items-center
    .state.bg-p100
    .content
      .i-mdi-menu
  .title.grow.whitespace-nowrap.overflow-hidden.self-center(data-native-drag-region)
    .content(data-native-drag-region) Era Mod Manager {{ $route.path }}
  .btn.help.min-w-8.grid.place-items-center(@click="$router.push('/main/help')")
    .state.bg-p100
    .content
      .i-mdi-help
  .btn.minimize.min-w-8.grid.place-items-center(@click="appWindow.minimize")
    .state.bg-p100
    .content
      .i-mdi-window-minimize
  .btn.maximize.min-w-8.grid.place-items-center(@click="toggleMaximize")
    .state.bg-p100
    .content
      .i-mdi-window-restore(v-if="isMaximized")
      .i-mdi-window-maximize(v-else)
  .btn.close.min-w-8.grid.place-items-center(@click="appWindow.close")
    .state.bg-p100
    .content
      .i-mdi-window-close
</template>

<style scoped lang="stylus">

</style>
