declare module '*.peggy?raw' {
  const text = ''
  export default text
}

declare module 'pegjs-backtrace' {
  export default class Tracer {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(text: string, options?: Options)
    getBacktraceString(): string
    trace()
  }
  export interface Options {
    hiddenPaths?: string[]
    matchesNode?: CallableFunction
    maxSourceLines?: number
    maxPathLength?: number
    output?: CallableFunction
    parent?: object
    showTrace?: boolean
    useColor?: boolean
  }
}
