<script setup lang="ts">
import { useCache } from '~/stores/cache'
import { useConfig } from '~/stores/config'
import { useFlow } from '~/stores/flow'
import { useNative } from '~/stores/native'

const { t, locale } = useI18n()
const native = useNative()
const router = useRouter()
const content = ref('main')

onMounted(() => {
  useFlow().hotReload()
})

function changeLocale(name: string) {
  locale.value = name
}

async function accept() {
  if (native.isNative()) {
    await useConfig().init()
    await useCache().init()
  }
  useCache().FirstRun = false
  router.replace('/splash')
}
</script>

<template lang="pug">
.first-run.h-screen.flex.flex-col.text-p100.bg-p40.text-center
  header
    .title.flex.h-8
      .btn.close.w-8.grid.place-items-center(@click="content = 'main'" v-if="content !== 'main'")
        .state.bg-p100
        .content
          .i-mdi-chevron-left
      .grow.grid.place-items-center(data-native-drag-region) Era Mod Manager
      .btn.close.w-8.grid.place-items-center
        .state.bg-p100
        .content
          .i-mdi-window-close
    .locale.flex.h-8
      .btn.grow.grid.place-items-center(:class="{ active: locale === 'en' }" @click="changeLocale('en')")
        .state.bg-p100
        .content.grow English
      .btn.grow.grid.place-items-center(:class="{ active: locale === 'ja' }" @click="changeLocale('ja')")
        .state.bg-p100
        .content.grow 日本語
      .btn.grow.grid.place-items-center(:class="{ active: locale === 'zh-CN' }" @click="changeLocale('zh-CN')")
        .state.bg-p100
        .content.grow 简体中文
      .btn.grow.grid.place-items-center(:class="{ active: locale === 'zh-TW' }" @click="changeLocale('zh-TW')")
        .state.bg-p100
        .content.grow 繁體中文
  main.grow.text-left.px-4(v-if="content === 'main'")
    h1.text-center {{ t("first-run.heading") }}
    p {{ t("first-run.text[0]") }}
    p {{ t("first-run.text[1]") }}
    p(v-if="locale === 'en'")
      span 'By clicking the "Accept" button below, it also means you agree to our
      a.text-p100(href='#' @click="content = 'privacy'") Privacy Policy
      span ,&nbsp;
      a.text-p100(href='#' @click="content = 'cookie'") Cookie Policy
      span &nbsp;
      span and
      span &nbsp;
      a.text-p100(href='#' @click="content = 'disclaimer'") Disclaimer
      span .
    p(v-if="locale === 'zh-CN'")
      span 点击下方“接受并继续”按钮，也意味着您同意接受我们的
      a.text-p100(href='#' @click="content = 'privacy'") 隐私政策
      span ，
      a.text-p100(href='#' @click="content = 'cookie'") Cookie 政策
      span 和
      a.text-p100(href='#' @click="content = 'disclaimer'") 免责声明
      span 。
  main.grow.text-left.px-4(v-if="content === 'privacy'")
    h1.text-center {{ t("Privacy Policy") }}
  main.grow.text-left.px-4(v-if="content === 'cookie'")
    h1.text-center {{ t("Cookie Policy") }}
    p App is not currently using your cookie information.
  main.grow.text-left.px-4(v-if="content === 'disclaimer'")
    h1.text-center {{ t("Disclaimer") }}
  footer.flex.h-8(v-if="content === 'main'")
    .btn.grow.grid.place-items-center
      .state.bg-p100
      .content Reject & Exit
    .btn.grow.grid.place-items-center(@click="accept")
      .state.bg-p100
      .content Accept & Continue
</template>

<style scoped lang="stylus">
.locale
  .btn
    &.active
      font-weight bold
</style>
