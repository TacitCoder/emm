import { test, describe } from 'vitest'
import EraBaiscPrettierPlugin from '../src'
import { format } from 'prettier'

describe('default', () => {
  test('default', () => {
    console.log(
      'Result:\n' + format('@123\n;123\n;123\n;123', {
        parser: 'erabasic',
        plugins: [EraBaiscPrettierPlugin]
      }),'\n---'
      );
  })
})