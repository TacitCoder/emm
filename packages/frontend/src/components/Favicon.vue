<script setup lang="ts">
const props = defineProps<{
  type: 'block' | 'inline' | 'text'
  color?: string
  bg?: string
}>()
</script>

<template lang="pug">
svg.block(viewBox="0 0 13 13" v-if="$props.type === 'block'")
  defs
    g(id="e")
      path(d="M4,0L0,0L0,4L4,4")
      path(d="M0,2L4,2")
  rect.background(x="1.5" y="1.5" width="10" height="10")
  use(x="1.5" y="1.5" xlink:href="#e")
  g(transform="rotate(90)")
    use(x="1.5" y="-11.5" xlink:href="#e")
  g(transform="rotate(90)")
    use(x="7.5" y="-5.5" xlink:href="#e")
  rect.content(x="7.5" y="7.5" width="4" height="4")
svg.inline(viewBox="0 0 19 7" v-if="$props.type === 'inline'")
  defs
    g(id="e")
      path(d="M4,0L0,0L0,4L4,4")
      path(d="M0,2L4,2")
  rect.background(x=".5" y=".5" width="18" height="6")
  use(x="1.5" y="1.5" xlink:href="#e")
  g(transform="rotate(90)")
    use(x="1.5" y="-11.5" xlink:href="#e")
  g(transform="rotate(90)")
    use(x="1.5" y="-17.5" xlink:href="#e")
svg.text(viewBox="0 0 17 5" v-if="$props.type === 'text'")
  defs
    g(id="e")
      path(d="M4,0L0,0L0,4L4,4")
      path(d="M0,2L4,2")
  use(x=".5" y=".5" xlink:href="#e")
  g(transform="rotate(90)")
    use(x=".5" y="-10.5" xlink:href="#e")
  g(transform="rotate(90)")
    use(x=".5" y="-16.5" xlink:href="#e")
</template>

<style scoped lang="stylus">
svg
  stroke-linecap round
  stroke-linejoin round
  use
    stroke v-bind('$props.color')
    fill none
  rect
    &.background
      stroke v-bind('$props.bg')
      fill v-bind('$props.bg')
      stroke-width 3px
    &.content
      stroke v-bind('$props.color')
      fill v-bind('$props.color')
</style>
