import type { Parser, ParserOptions } from 'prettier'
import { PeggyParser } from 'erabasic-parser'

export function parse(text: string, _parsers: Record<string, Parser>, _options: ParserOptions) {
  const parser = new PeggyParser()
  try {
    return parser.parse(text)
  }
  catch (e) {
    return e
  }
}
