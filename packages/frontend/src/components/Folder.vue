<script setup lang="ts">
import { onMounted, watch } from 'vue'

const props = defineProps<{
  'folder-id': string
}>()
onMounted(() => {
  console.log(props['folder-id'])
})
watch(props, async() => {
  console.log(222)
})
</script>

<template lang="pug">
div 123
div {{ props }}
div {{ $props }}
</template>

<style scoped lang="stylus">

</style>
