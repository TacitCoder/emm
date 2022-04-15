<script setup lang="ts">
import Explorer from './index.vue'

const props = defineProps<{ path: string }>()
</script>

<template lang="pug">
Explorer(:path="props.path")
</template>

<style scoped lang="stylus">

</style>

<route lang="yaml">
meta:
  layout: main
</route>
