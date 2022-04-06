import { generate } from 'peggy'
import type { Parser as PeggyParserType } from 'peggy'
import Tracer from 'pegjs-backtrace'
import EraBasicPeggy from 'erabasic-grammar/erabasic.peggy?raw'

export interface Parser {
  parse(text: string): Record<string, any>
}

export class PeggyParser implements Parser {
  parse(text: string): Record<string, any> {
    let parser: PeggyParserType
    try {
      parser = generate(EraBasicPeggy, { trace: true })
    }
    catch (e) {
      throw new Error(e)
    }
    const tracer = new Tracer(text, { useColor: false })
    try {
      return parser.parse(text, { tracer })
    }
    catch (e) {
      throw new Error(e)
    }
  }
}

export class LezerParser implements Parser {
  parse(text: string): Record<string, any> {
    throw new Error('Method not implemented.')
  }
}
