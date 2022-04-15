import { AstPath, doc, Doc, ParserOptions } from "prettier";

const {
  builders: {
    join,
    line,
    ifBreak,
    group,
    indent,
    softline
  }
} = doc

export function print(path: AstPath, options: ParserOptions, print: (path: AstPath) => Doc) {
  const node = path.getValue()
  console.log('Current:', node);
  switch (node.type) {
    case 'Script':
      return [
        path.map(print, 'children'),
      ]
    case 'Function':
      return [
        '@', node.name,
        indent([
          line,
          path.map(print, 'children')
        ])
      ]
    case 'LineComment':
      return [';', node.text, line]
    default:
      return ''
  }
}