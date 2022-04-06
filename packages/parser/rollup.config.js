import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: [{
    file: path.join(__dirname, 'dist/erabasic-parser.es.js'),
    format: 'esm',
  }, {
    name: 'erabasic-parser',
    file: path.join(__dirname, 'dist/erabasic-parser.umd.js'),
    format: 'umd',
  }],
  plugins: [
    typescript({

    }),
    commonjs()
  ],
  external: [
    'peggy',
    'pegjs-backtrace',
  ]
};