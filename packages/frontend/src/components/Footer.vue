<script setup lang="ts">
import { ref } from 'vue'
const { t } = useI18n()
interface Output {
  input: string
  output: string
}
const showShell = ref(false)
const input = ref()
const output = ref([] as Output[])
function exec(e: Event) {
  const cmd = input.value.innerText
  input.value.innerText = ''
  console.log(cmd)
  output.value.push({
    input: cmd,
    output: cmd,
  })
}
</script>

<template lang="pug">
footer
  header.flex
    .btn.status
      .state.expand
      .content
        .icon
          i.fas.fa-asterisk.fa-fw.fa-spin
        .text
          span {{ `${1} ${t('Task Running...')}` }}
    .grow
    .btn.shell(@click="showShell = !showShell")
      .state.expand
      .content
        .icon
          i.fas.fa-terminal.fa-fw
        .text
          span {{ `${t('EraShell')}` }}
  main.shell(:class="{ show: showShell }")
    .output(v-for="v in output")
      .i {{ v.input }}
      .o {{ v.output }}
    .input.flex
      .icon
        i.fas.fa-angle-right.fa-fw
      .grow(contenteditable @keypress.enter.prevent="exec" ref="input")
</template>

<style scoped lang="stylus">
footer
  header
    height 2rem
    color var(--sc-sys-color-on-background)
    background-color var(--sc-sys-color-background)
    border-top 1px solid var(--sc-sys-color-outline)
    border-bottom 1px solid var(--sc-sys-color-outline)
    .btn
      position relative
      display flex
      align-items center
      cursor pointer
      z-index 0
      .state
        z-index -1
        background-color var(--sc-sys-color-on-background)
        opacity 0
      .content
        z-index 0
        display flex
        .icon
          width 2rem
          text-align center
        .text
          max-width 0rem
          padding-right 0rem
          white-space nowrap
          overflow hidden
          transition max-width .5s ease-out,padding .5s ease-out
      &:hover
        .state
          opacity var(--sc-sys-state-hover-opacity)
        .content
          .text
            padding-right .5rem
      &.status:hover
        .content
          .text
            max-width 10rem
      &.shell:hover
        .content
          .text
            max-width 5rem
  main.shell
    height 3rem
    color var(--sc-sys-color-on-background)
    background-color var(--sc-sys-color-background)
    height 0
    transition height .5s
    overflow hidden
    &.show
      height 6rem
    [contenteditable]
      outline none
      // background-color var(--sc-sys-color-on-background)
</style>
