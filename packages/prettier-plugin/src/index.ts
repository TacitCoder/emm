import { doc } from 'prettier'
import type { AstPath, Doc, Parser, ParserOptions, Plugin, Printer } from 'prettier'
import { parse } from './parser'
import { print } from './printer'

const languages = [
  {
    name: 'EraBasic',
    parsers: ['erabasic'],
  },
]

const parsers = {
  erabasic: {
    parse,
    astFormat: 'erabasic-ast',
  } as Parser,
}

const printers = {
  'erabasic-ast': {
    print,
  } as Printer,
}

const options = {}

const defaultOptions = {}

export default {
  languages,
  parsers,
  printers,
  options,
  defaultOptions,
} as Plugin
