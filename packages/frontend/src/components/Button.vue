<script setup lang="ts">
const props = defineProps<{
  type?: 'elevated' | 'filled' | 'filled tonal' | 'outlined' | 'text'
  role?: 'primary' | 'secondary' | 'tertiary' | 'error'
  state?: 'enabled' | 'hovered' | 'focused' | 'pressed' | 'disabled'
}>()
function getClassObj() {
  const o: any = {}
  if (props.type)
    o[props.type] = true
  else o.filled = true
  if (props.role)
    o[props.role] = true
  else o.primary = true
  if (props.state)
    o[props.state] = true
  else o.enabled = true
  return o
}
</script>

<template lang="pug">
.button(:class="getClassObj()")
  .container
  .state
  .content
    .icon
      slot(name="icon")
        i.fas.fa-check.fa-fw
    .text
      slot(name="default") Button
</template>

<style scoped lang="stylus">
.button
  z-index 0
  cursor pointer
  position relative
  width fit-content
  user-select none
  font-weight bold
  margin 0 .2rem
  .container
    z-index -2
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    border-radius 3rem
  .state
    z-index -1
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background-color var(--sc-sys-color-on-primary)
    opacity 0
  .content
    padding .2rem 1rem
    color var(--sc-sys-color-on-primary)
    display flex
    gap .2rem
  &:hover
    .state
      opacity .08
  &:active
    .state
      opacity .12
  &.filled
    .container
      background-color var(--sc-sys-color-primary)
  &.text
    .content
      color var(--sc-sys-color-primary)
</style>
