<script setup lang="ts">
import { useCache } from '~/stores/cache'
import { useConfig } from '~/stores/config'
import { useFlow } from '~/stores/flow'
import { useNative } from '~/stores/native'

const router = useRouter()
const native = useNative()
const flow = useFlow()
const cache = useCache()
const config = useConfig()

async function sleep(ms: number) {
  return new Promise(ok => setTimeout(ok, ms))
}

onMounted(async() => {
  if (native.isNative()) {
    await native.setSize(300, 600)
    await native.center()
    await native.show()
  }
  flow.hotReload()
  await sleep(3000)
  if (native.isNative()) {
    if (!(await config.exist()))
      cache.FirstRun = true
    // useRouter().replace("/first-run");
    // await config.init();
    // await cache.init();
    // cache.FirstRun = true;

    else
      cache.FirstRun = false
    // await config.load();
    // if (!(await cache.exist())) await cache.init();
    // else await cache.load();
    // useTheme().update();
    // useRouter().replace("/first-run");
  }
  if (cache.FirstRun) {
    router.replace('/first-run')
  }
  else {
    await native.setSize(1366, 768)
    await native.center()
    router.replace('/overview')
  }
})
</script>

<template lang="pug">
.splash.h-screen.flex.flex-col.text-center.bg-p40.text-p100(data-native-drag-region)
  header.flex.h-8
    .grow
    .close.btn.w-8.grid.place-items-center(@click="native.close")
      .state.bg-p100
      .i-mdi-window-close
  main.grow.grid.place-items-center
    Favicon(type="block" color="var(--sc-ref-palette-primary100)" bg="var(--sc-ref-palette-primary40)" :key="$route.fullPath")
    .center-group
      .title.text-xl.font-bold(data-native-drag-region) Era Mod Manager
      .i-mdi-asterisk.inline-block.animate-spin
      .status.opacity-50.text-xs Loading...
  footer.h-8.grid.place-items-center
    .text-2.font-bold GPL-3.0+ Licensed | Copyright © 2022-Present Tacit Coder.
</template>

<style scoped lang="stylus">

</style>

<style lang="stylus">
svg
  display inline-block
  height 8rem
  z-index 2
</style>
