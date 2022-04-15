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
import type { Tree, TreeCursor } from '@lezer/common'
import { buildParser } from '@lezer/generator'
import type { LRParser } from '@lezer/lr'
import { getLezerParser } from 'erabasic-parser'
import YAML from 'js-yaml'
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
const result = ref()

interface State {
  source?: string
  parser?: string
  result?: string
}

const state: State = {
  source: undefined,
  parser: undefined,
  result: undefined,
}

let sourceEditor: EditorView
let parserEditor: EditorView
let resultEditor: EditorView

function printTree(tree: Tree) {
  const cursor = tree.cursor()
  function visit(cursor: TreeCursor) {
    const tree = {
      name: cursor.name,
      from: cursor.from,
      to: cursor.to,
      text: sourceEditor.state.doc.slice(cursor.from, cursor.to).toString(),
      children: [] as any,
    }

    const child = cursor.firstChild()
    if (!child)
      return tree

    do {
      const copy = cursor.node.cursor
      tree.children.push(visit(copy))
    } while (cursor.nextSibling())
    console.log(tree)

    return tree
  }
  return YAML.dump(visit(cursor))
}

function parse() {
  if (state.parser) {
    let parser: LRParser
    try {
      parser = buildParser(state.parser)
      resultEditor.dispatch({
        changes: { from: 0, to: resultEditor.state.doc.length },
      })
    }
    catch (e: any) {
      if (resultEditor) {
        resultEditor.dispatch({
          changes: { from: 0, to: resultEditor.state.doc.length, insert: e.toString() },
        })
      }
      return
    }
    if (state.source) {
      const tree = parser.parse(state.source)
      resultEditor.dispatch({
        changes: { from: 0, to: resultEditor.state.doc.length, insert: printTree(tree) },
      })
    }
  }
}

onMounted(() => {
  useFlow().hotReload()
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
      borderLeftColor: 'var(--sc-sys-color-on-primary)',
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
  resultEditor = new EditorView({
    parent: result.value,
    state: EditorState.create({
      extensions: [
        basicSetup,
        theme,
      ],
    }),
  })
})

</script>

<template lang="pug">
.lezer.grow.grid.grid-cols-3.bg-b.text-ob
  .editor.source.h-full.overflow-auto(ref='source')
  .editor.parser.h-full.overflow-auto(ref='parser')
  .editor.result.h-full.overflow-auto(ref='result')
</template>

<style lang="stylus">
.editor>.cm-editor
  height 100%
</style>

<route lang="yaml">
meta:
  layout: main
</route>
