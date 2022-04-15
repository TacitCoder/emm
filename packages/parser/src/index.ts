import { generate } from 'peggy'
import type { Parser as PeggyParserType } from 'peggy'
import Tracer from 'pegjs-backtrace'
import { buildParser } from '@lezer/generator'
import type { LRParser } from '@lezer/lr'
import EraBasicPeggy from 'erabasic-grammar/erabasic.peggy?raw'
import EraBasicLezer from 'erabasic-grammar/erabasic.grammar?raw'

export interface Parser {
  parse(text: string): Record<string, any>
}

export class PeggyParser implements Parser {
  parse(text: string): Record<string, any> {
    let parser: PeggyParserType
    try {
      parser = generate(EraBasicPeggy, { trace: true })
    }
    catch (e: any) {
      throw new Error(e)
    }
    const tracer = new Tracer(text, { useColor: false })
    try {
      return parser.parse(text, { tracer })
    }
    catch (e: any) {
      throw new Error(e)
    }
  }
}
export function getLezerParser(): LRParser {
  return buildParser(EraBasicLezer)
}
