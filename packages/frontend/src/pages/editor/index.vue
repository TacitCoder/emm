<script setup lang="ts">
import { useFlow } from '~/stores/flow'
import { useNative } from '~/stores/native'
import { useWorkspace } from '~/stores/workspace'

const props = defineProps<{ path?: string }>()

const workspace = useWorkspace()
const native = useNative()

const pathItems = computed(() => (props.path ? props.path.split('/') : []))

const displayPathItems = computed(() => (['/', ...pathItems.value.map(p => (`${p}/`))]))
const lines = ref([] as string[])
onMounted(async() => {
  await useFlow().hotReload()
  const d = await native.readFile(await native.join(...pathItems.value) ?? '')
  lines.value = d.search('\r\n') > 0 ? d.split('\r\n') : d.split('\n')
})
</script>

<template lang="pug">
.editor.grow.flex.flex-col.bg-b.text-ob
  .header.flex
    .title Editor&nbsp;
    .path-btn.font-mono
      span(v-for="(v, i) in displayPathItems" @click="$router.push(links[i])") {{ v }}
  .content.grow.flex.overflow-hidden
    .aside.explorer
    .main.grow.overflow-auto.font-mono
      .line(v-for="(v, i) in lines") {{ v }}
</template>

<style scoped lang="stylus">

</style>

<route lang="yaml">
meta:
  layout: main
</route>
