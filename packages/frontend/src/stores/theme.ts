import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from '@material/material-color-utilities'
import { usePreferredColorScheme, useThrottleFn } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useConfig } from './config'

export const useTheme = defineStore('theme', {
  state: () => {
    return {}
  },
  actions: {
    async setThemeMode(mode: 'auto' | 'light' | 'dark') {
      const config = useConfig()
      config.ThemeMode = mode
      config.save()
      await this.update()
    },
    async setThemeColor(hex: string) {
      await setThemeColor(hex)
      // await this.update();
    },
    async update() {
      updateThemeMode()
      updateThemeColor()
    },
  },
})

const Tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]

function chr(code: number) {
  return String.fromCharCode(code)
}

function ord(str: string) {
  return str.charCodeAt(0)
}

function U2DL(str: string) {
  let res = ''
  for (let i = 0; i < str.length; ++i) {
    const c = ord(str[i])
    if (c >= 65 && c <= 90)
      res += `-${chr(c + 32)}`

    else
      res += str[i]
  }
  return res
}

async function updateThemeMode() {
  let mode = useConfig().ThemeMode
  if (mode === 'auto') {
    const tmode = usePreferredColorScheme().value
    if (tmode === 'no-preference')
      mode = 'light'
    else mode = 'dark'
  }
  if (mode === 'light')
    document.documentElement.classList.remove('dark')
  else if (mode === 'dark')
    document.documentElement.classList.add('dark')
}

const setThemeColor = useThrottleFn(async(hex: string) => {
  const config = useConfig()
  config.ThemeColor = hex
  config.save()
  await updateThemeColor()
}, 500)

async function updateThemeColor() {
  const color = useConfig().ThemeColor
  const theme = themeFromSourceColor(argbFromHex(color), [
    { value: argbFromHex('#00ff00'), name: 'green', blend: true },
    { value: argbFromHex('#ffff00'), name: 'yellow', blend: true },
    { value: argbFromHex('#0000ff'), name: 'blue', blend: true },
  ])

  let css = ''
  css += ':root{'
  for (const key in theme.palettes) {
    for (let i = 0; i < Tones.length; ++i) {
      css += `--sc-ref-palette-${U2DL(key)}${Tones[i]}:${hexFromArgb(
        (theme.palettes as any)[key].tone(Tones[i]),
      )};`
    }
  }
  theme.customColors.forEach((customColor) => {
    for (const key in customColor.light) {
      const role = U2DL(key).replace('color', customColor.color.name)
      css += `--sc-sys-color-${role}:${hexFromArgb(
        (customColor.light as any)[key],
      )};`
    }
    for (const key in customColor.dark) {
      const role = U2DL(key).replace('color', customColor.color.name)
      css += `--sc-sys-color-${role}:${hexFromArgb(
        (customColor.dark as any)[key],
      )};`
    }
  })
  css += '}'
  const styleElement = document.head.querySelector('#span-charm-color-palette')
  if (!styleElement) {
    const newStyleElement = document.createElement('style')
    newStyleElement.innerHTML = css
    newStyleElement.id = 'span-charm-color-palette'
    document.head.appendChild(newStyleElement)
  }
  else {
    styleElement.innerHTML = css
  }
}
