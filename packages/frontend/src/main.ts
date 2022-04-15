import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from './i18n'
import '@unocss/reset/sanitize/sanitize.css'
import 'uno.css'
import './styles/index.styl'
import 'intro.js/minified/introjs.min.css'
import 'quill/dist/quill.snow.css'

performance.mark('main')

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(generatedRoutes),
})

app.use(i18n)
app.use(router)
app.use(createPinia())
app.mount('body')
