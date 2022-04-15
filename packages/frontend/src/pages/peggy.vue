<script setup lang="ts">
import { autocompletion, completionKeymap } from '@codemirror/autocomplete'
import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets'
import { defaultKeymap } from '@codemirror/commands'
import { commentKeymap } from '@codemirror/comment'
import { foldGutter, foldKeymap } from '@codemirror/fold'
import { highlightActiveLineGutter, lineNumbers } from '@codemirror/gutter'
import type { Tag } from '@codemirror/highlight'
import { HighlightStyle, defaultHighlightStyle, styleTags, tags } from '@codemirror/highlight'
import { history, historyKeymap } from '@codemirror/history'
import { lezer } from '@codemirror/lang-lezer'
import { LRLanguage, LanguageSupport, foldNodeProp, indentNodeProp, indentOnInput } from '@codemirror/language'
import { lintKeymap } from '@codemirror/lint'
import { bracketMatching } from '@codemirror/matchbrackets'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { EditorState } from '@codemirror/state'
import { EditorView, drawSelection, dropCursor, highlightActiveLine, highlightSpecialChars, keymap } from '@codemirror/view'
import { getLezerParser } from 'erabasic-parser'
import { generate } from 'peggy'
import { useFlow } from '~/stores/flow'

const TnHL: { HL: any; T: Record<string, Tag> } = {
  HL: [
    { tag: tags.comment, color: 'var(--sc-sys-color-secondary-container)', fontStyle: 'italic' },
    { tag: tags.lineComment, color: 'var(--sc-sys-color-secondary-container)', fontStyle: 'italic' },
    { tag: tags.name, color: 'var(--sc-sys-color-error-container)' },
    { tag: tags.variableName, color: 'var(--sc-sys-color-error-container)' },
    { tag: tags.keyword, color: 'var(--sc-sys-color-green-container)' },
  ],
  T: {
    Comment: tags.comment,
    LineComment: tags.lineComment,
    FunctionName: tags.name,
    VariableName: tags.variableName,
    Number: tags.number,
  },
}

const customHighlightStyle = HighlightStyle.define(TnHL.HL)

const basicSetup = [
  highlightSpecialChars(),
  history(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  defaultHighlightStyle.fallback,
  customHighlightStyle,
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...commentKeymap,
    ...completionKeymap,
    ...lintKeymap,
  ]),
]

const source = ref()
const parser = ref()
const error = ref()
const result = ref()

interface State {
  source?: string
  parser?: string
}

const state: State = {
  source: undefined,
  parser: undefined,
}

let sourceEditor: EditorView
let parserEditor: EditorView
let errorEditor: EditorView
let resultEditor: EditorView

function parse() {
  errorEditor.dispatch({
    changes: { from: 0, to: errorEditor.state.doc.length },
  })
  resultEditor.dispatch({
    changes: { from: 0, to: resultEditor.state.doc.length },
  })
  if (state.parser) {
    let parser
    try {
      parser = generate(state.parser, { trace: true })
    }
    catch (e: any) {
      errorEditor.dispatch({
        changes: { from: 0, to: errorEditor.state.doc.length, insert: e.toString() },
      })
      return
    }
    if (state.source) {

      // const tracer = new Tracer(state.source, {
      //   useColor: false,
      // })
      // try {
      //   console.log(parser.parse(state.source, { tracer }))
      //   resultEditor.dispatch({
      //     changes: { from: 0, to: resultEditor.state.doc.length, insert: '' },
      //   })
      // }
      // catch (e: any) {
      //   errorEditor.dispatch({
      //     changes: { from: 0, to: errorEditor.state.doc.length, insert: e.toString() },
      //   })
      //   resultEditor.dispatch({
      //     changes: { from: 0, to: resultEditor.state.doc.length, insert: tracer.getBacktraceString() },
      //   })
      // }
    }
  }
}

function initLater() {
  const ls = new LanguageSupport(
    LRLanguage.define({
      parser: getLezerParser().configure({
        props: [
          indentNodeProp.add({}),
          foldNodeProp.add({}),
          styleTags(TnHL.T),
        ],
      }),
      languageData: {
        commentTokens: { line: ';' },
      },
    }),
  )
  const theme = EditorView.baseTheme({
    '.cm-scroller>.cm-gutters': {
      color: 'var(--sc-sys-color-on-secondary-container)',
      backgroundColor: 'var(--sc-sys-color-secondary-container)',
    },
    '.cm-gutters>.cm-gutter>.cm-activeLineGutter': {
      color: 'var(--sc-sys-color-on-secondary)',
      backgroundColor: 'var(--sc-sys-color-secondary)',
    },
    '.cm-activeLine': {
      color: 'var(--sc-sys-color-on-tertiary-container)',
      backgroundColor: 'var(--sc-sys-color-tertiary-container)',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      color: 'var(--sc-sys-color-on-tertiary-container)',
      backgroundColor: 'var(--sc-sys-color-tertiary-container)',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: 'var(--sc-sys-color-on-background)',
    },
  })

  sourceEditor = new EditorView({
    parent: source.value,
    state: EditorState.create({
      extensions: [
        basicSetup,
        lineNumbers(),
        highlightActiveLineGutter(),
        foldGutter(),
        highlightActiveLine(),
        theme,
        ls,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            state.source = update.state.doc.toString()
            parse()
          }
        }),
      ],
    }),
  })
  parserEditor = new EditorView({
    parent: parser.value,
    state: EditorState.create({
      extensions: [
        basicSetup,
        lineNumbers(),
        highlightActiveLineGutter(),
        foldGutter(),
        highlightActiveLine(),
        theme,
        lezer(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            state.parser = update.state.doc.toString()
            parse()
          }
        }),
      ],
    }),
  })
  errorEditor = new EditorView({
    parent: error.value,
    state: EditorState.create({
      extensions: [
        basicSetup,
        theme,
        EditorView.lineWrapping,
      ],
    }),
  })
  resultEditor = new EditorView({
    parent: result.value,
    state: EditorState.create({
      extensions: [
        basicSetup,
        theme,
      ],
    }),
  })
}

onMounted(() => {
  useFlow().hotReload()
  nextTick(initLater)
})

</script>

<template lang="pug">
.peggy.grow.grid.grid-cols-3.bg-b.text-ob
  .editor.source.h-full.overflow-auto(ref='source')
  .editor.parser.h-full.overflow-auto(ref='parser')
  .flex.flex-col.overflow-auto
    .editor.error(ref='error')
    .editor.result.grow.overflow-auto(ref='result')
</template>

<style lang="stylus">
.source>.cm-editor
  height 100%
.parser>.cm-editor
  height 100%
.result>.cm-editor
  height 100%
</style>

<route lang="yaml">
meta:
  layout: main
</route>
