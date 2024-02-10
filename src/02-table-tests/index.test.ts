// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 8, b: 4, action: Action.Add, expected: 12 },
  { a: 8, b: 4, action: Action.Subtract, expected: 4 },
  { a: 8, b: 4, action: Action.Multiply, expected: 32 },
  { a: 8, b: 4, action: Action.Divide, expected: 2 },
  { a: 8, b: 4, action: Action.Exponentiate, expected: 4096 },
  { a: 8, b: 4, action: '', expected: null },
  { a: 8, b: 'error', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Should return $expected when number a=$a number b=$b and action is "$action"',
    (testCases) => {
      expect(simpleCalculator(testCases)).toBe(testCases.expected);
    },
  );
});
