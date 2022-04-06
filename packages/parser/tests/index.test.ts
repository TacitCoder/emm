import { test, describe } from 'vitest'
import { PeggyParser } from '../'

describe('index', () => {
  test('index', () => {
    console.log(
      new PeggyParser().parse('\n\n\n\n')
    );
  })
})