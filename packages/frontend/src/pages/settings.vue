<script setup lang="ts">
import { useConfig } from '~/stores/config'
import { useFlow } from '~/stores/flow'
import { useTheme } from '~/stores/theme'

const { t, locale } = useI18n()

const theme = useTheme()
const config = useConfig()

onMounted(async() => {
  await useFlow().hotReload()
  locale.value = config.Locale
})

function changeLocale(e: any) {
  locale.value = e.target.value
  config.Locale = e.target.value
  config.save()
}

function changeThemeMode(e: any) {
  theme.setThemeMode(e.target.value)
}

function changeThemeColor(e: any) {
  theme.setThemeColor(e.target.value)
}
</script>

<template lang="pug">
.preference.grow.flex.flex-col.gap-2.px-8.bg-b.text-ob
  div
    h1 {{ t('settings.general') }}
  div
    label.font-bold {{ t('settings.language') }}
  div
    select.flex(@change="changeLocale" v-model="config.Locale")
      option(value="en") English
      option(value="ja") 日本語
      option(value="zh-CN") 简体中文
      option(value="zh-TW") 繁體中文
  div
    label.font-bold {{ t('settings.theme-mode.text') }}
  div
    input(type="radio" name="theme-mode" id="theme-mode-auto" value="auto" @change="changeThemeMode" v-model="config.ThemeMode")
    label(for="theme-mode-auto") {{ t('settings.theme-mode.auto') }}
    input.ml-2(type="radio" name="theme-mode" id="theme-mode-light" value="light" @change="changeThemeMode" v-model="config.ThemeMode")
    label(for="theme-mode-light") {{ t('settings.theme-mode.light') }}
    input.ml-2(type="radio" name="theme-mode" id="theme-mode-dark" value="dark" @change="changeThemeMode" v-model="config.ThemeMode")
    label(for="theme-mode-dark") {{ t('settings.theme-mode.dark') }}
  div
    label.font-bold {{ t('settings.theme-color') }}
  div
    input(type="color" @input="changeThemeColor" :value="config.ThemeColor")
  div
    h1 {{ t('settings.developer-info') }}
  div
    label.font-bold {{ t('settings.author-name') }}
  div
    input(type="text" :value="''" :placeholder="t('settings.user.name.placeholder')")
  div
    label.font-bold {{ t('settings.author-id') }}
  div
    input(type="text" :value="''" :placeholder="t('settings.user.id.placeholder')")
  div
    input(type="checkbox")
    label
      abbr(:title="t('settings.strict-auth-abbr')" :value="true") {{ t('settings.strict-auth') }}
</template>

<style scoped lang="stylus">

</style>

<route lang="yaml">
meta:
  layout: main
</route>
