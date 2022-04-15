import {
  defineConfig,
  extractorSplit,
  presetAttributify,
  presetIcons,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import extractorPug from '@unocss/extractor-pug'
import presetWind from '@unocss/preset-wind'

export default defineConfig({
  shortcuts: {
  },
  presets: [
    presetWind({
      variants: {
        container: [],
      },
      corePlugins: {
        container: false,
      },
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'i-mdi-search-web i-mdi-download i-mdi-information i-mdi-playlist-edit i-mdi-gamepad-variant i-mdi-engine i-mdi-script i-mdi-view-module i-mdi-content-save i-mdi-folder-search i-mdi-file-document-edit i-mdi-toolbox i-mdi-package i-mdi-wrench i-mdi-cog'.split(' '),
  extractors: [
    extractorPug(),
    extractorSplit,
  ],
  rules: [
    ['font-mono', { 'font-family': 'Sarasa Mono SC' }],
    [
      /^(text|bg|border)-(o)?(p|s|t|e|b|su|ou|sh)(c)?(\d+)?$/,
      (match) => {
        let mode = 'color'
        let key = ''
        switch (match[1]) {
          case 'text':
            key = 'color'
            break
          case 'bg':
            key = 'background-color'
            break
          case 'border':
            key = 'border-color'
            break
          default:
            break
        }
        let s = ''
        for (let i = 2; i < match.length; i++) {
          if (match[i] === 'o') {
            s += '-on'
          }
          else if (match[i] === 'p') {
            s += '-primary'
          }
          else if (match[i] === 's') {
            s += '-secondary'
          }
          else if (match[i] === 't') {
            s += '-tertiary'
          }
          else if (match[i] === 'e') {
            s += '-error'
          }
          else if (match[i] === 'b') {
            s += '-background'
          }
          else if (match[i] === 'su') {
            s += '-surface'
          }
          else if (match[i] === 'ou') {
            s += '-outline'
          }
          else if (match[i] === 'sh') {
            s += '-shadow'
          }
          else if (match[i] === 'c') {
            s += '-container'
          }
          else if (match[i] === undefined) {
          }
          else {
            s += match[i]
            mode = 'palette'
          }
        }
        const res: Record<string, string> = {}
        res[key]
          = mode === 'color'
            ? `var(--sc-sys-color${s})`
            : `var(--sc-ref-palette${s})`
        // console.warn(match, res);
        return res
      },
    ],
  ],
})
