import { createI18n } from 'vue-i18n'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
const messages = Object.fromEntries(
  Object.entries(
    import.meta.globEager('./locales/*.y(a)?ml'))
    .map(([k, v]) => {
      const yaml = k.endsWith('.yaml')
      return [k.slice(10, yaml ? -5 : -4), v.default]
    }),
)

export default createI18n({
  legacy: false,
  locale: 'en',
  messages,
})
