import path from 'path'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: [{
    file: path.join(__dirname, 'dist/prettier-plugin-erabasic.es.js'),
    format: 'esm',
  }, {
    name: 'PrettierPluginErabasic',
    file: path.join(__dirname, 'dist/prettier-plugin-erabasic.umd.js'),
    format: 'umd',
  }],
  plugins: [
    typescript(),
  ],
  external: [
    'erabasic-parser',
  ],
}
