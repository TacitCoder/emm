<script setup lang="ts">
const { t } = useI18n()

function getPath(entry: Entry) {
  if (entry.type === 'item' && entry.path)
    return entry.path
  else return ''
}

function getDynamicClass(entry: Entry) {
  const newClass = {} as Record<string, true>
  newClass[`i-mdi-${entry.icon}`] = true
  return newClass
}

interface Entry {
  type: 'item' | 'break' | 'grow'
  path?: string
  name?: string
  icon?: string
  disabled?: boolean
}

const entries: Entry[] = [
  {
    type: 'item',
    name: 'Browse',
    path: '/browse',
    disabled: true,
    icon: 'search-web',
  },
  {
    type: 'item',
    name: 'Download',
    path: '/download',
    disabled: true,
    icon: 'download',
  },
  { type: 'break' },
  {
    type: 'item',
    name: 'Overview',
    path: '/overview',
    disabled: false,
    icon: 'information',
  },
  {
    type: 'item',
    name: 'Recipe',
    path: '/recipe',
    disabled: false,
    icon: 'playlist-edit',
  },
  {
    type: 'item',
    name: 'Config',
    path: '/config',
    disabled: true,
    icon: 'gamepad-variant',
  },
  { type: 'break' },
  {
    type: 'item',
    name: 'Engine',
    path: '/engine',
    disabled: true,
    icon: 'engine',
  },
  {
    type: 'item',
    name: 'Source',
    path: '/source',
    disabled: true,
    icon: 'script',
  },
  {
    type: 'item',
    name: 'Mod',
    path: '/mod',
    disabled: true,
    icon: 'view-module',
  },
  {
    type: 'item',
    name: 'Save',
    path: '/save',
    disabled: true,
    icon: 'content-save',
  },
  { type: 'break' },
  {
    type: 'item',
    name: 'Explorer',
    path: '/explorer',
    disabled: false,
    icon: 'folder-search',
  },
  {
    type: 'item',
    name: 'Editor',
    path: '/editor',
    disabled: false,
    icon: 'file-document-edit',
  },
  {
    type: 'item',
    name: 'Tools',
    path: '/tools',
    disabled: true,
    icon: 'toolbox',
  },
  {
    type: 'item',
    name: 'Packager',
    path: '/packager',
    disabled: true,
    icon: 'package',
  },
  { type: 'grow' },
  {
    type: 'item',
    name: 'Peggy',
    path: '/peggy',
    disabled: false,
    icon: 'cog',
  },
  {
    type: 'item',
    name: 'Lezer',
    path: '/lezer',
    disabled: false,
    icon: 'cog',
  },
  {
    type: 'item',
    name: 'Plugin',
    path: '/plugin',
    disabled: true,
    icon: 'wrench',
  },
  {
    type: 'item',
    name: 'Settings',
    path: '/settings',
    disabled: false,
    icon: 'cog',
  },
]
</script>

<template lang="pug">
nav.flex-col.bg-b.text-ob.border-0.border-r.border-ou.hidden.relative(class="sm:flex")
  RouterLink(v-for="(entry, i) in entries" :to="getPath(entry)" custom v-slot="{ navigate, isActive }")
    .break.bg-ob(v-if="entry.type === 'break'")
    .grow(v-else-if="entry.type === 'grow'")
    .item(v-else-if="entry.type === 'item'" :class="{ active: isActive, disabled: entry.disabled }" @click="entry.disabled ? null : navigate()")
      .container
      .state.bg-ob
      .content.flex.h-8
        .icon.min-w-8.grid.place-items-center
          div(:class="getDynamicClass(entry)")
        .name.self-center.whitespace-nowrap.overflow-hidden.w-0(class="lg:w-20")
          span(v-if="entry.name") {{ t(entry.name) }}
</template>

<style scoped lang="stylus">
//   display flex
//   flex-direction column
//   border-right 1px solid var(--sc-sys-color-outline)
//   background-color var(--sc-sys-color-background)
//   user-select none
//     background-color var(--sc-sys-color-outline)
//   .grow
//     flex-grow 1
nav
  .break
    height 1px
  .item
    z-index 0
    position relative
    cursor pointer
    height 2rem
    display flex
    .container
      z-index -2
      position absolute
      top 0
      bottom 0
      left 0
      right 0
    .state
      z-index -1
      background-color var(--sc-sys-color-on-background)
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      opacity 0
    .content
      z-index 0
      display flex
      color var(--sc-sys-color-on-background)
      align-items center
      .icon
        width 2rem
        text-align center
      .name
        width 0rem
        white-space nowrap
        overflow hidden
        transition width .5s
    &:hover
      .state
        opacity var(--sc-sys-state-hover-opacity)
    &:active
      .state
        opacity var(--sc-sys-state-pressed-opacity)
    &.active
      .container
        background-color var(--sc-sys-color-secondary-container)
      .content
        color var(--sc-sys-color-on-secondary-container)
    &.disabled
      cursor default
      .container
        background-color var(--sc-sys-color-on-surface)
        opacity .12
      .content
        color var(--sc-sys-color-on-surface)
        opacity .38
      &:hover
        .state
          opacity 0
      &:active
        .state
          opacity 0
  &:hover
    .item
      .content
        .name
          width 5rem
</style>
