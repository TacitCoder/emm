<script setup lang="ts">
import { useFlow } from '~/stores/flow'

const { t } = useI18n()
const p = ref(0)

onMounted(() => {
  useFlow().hotReload()
  performance.mark('overview')
  p.value = performance.getEntriesByName('overview')[0].startTime - 3000
})
</script>

<template lang="pug">
.overview.grow.flex.bg-b.text-ob.relative
  .container.grow
    .title.flex
      .game-name Game Name
      .grow
      Button
        template(#icon)
          .i-mdi-play
        div {{ t('Launch') }}
    .content
      div Introduction
  .detail
  .mask.absolute.top-0.bottom-0.left-0.right-0.backdrop-filter.backdrop-blur.backdrop-brightness-80.grid.place-items-center.text-ob
    .i-mdi-asterisk.animate-spin
    div {{ p }}
</template>

<style scoped lang="stylus">

</style>

<style lang="stylus">
svg
  display inline-block
  height 8rem
  z-index 2
</style>

<route lang="yaml">
meta:
  layout: main
</route>
