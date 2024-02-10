// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rowInput = {
      a: 8,
      b: 4,
      action: Action.Add,
    };
    expect(simpleCalculator(rowInput)).toBe(12);
  });

  test('should subtract two numbers', () => {
    const rowInput = {
      a: 8,
      b: 4,
      action: Action.Subtract,
    };
    expect(simpleCalculator(rowInput)).toBe(4);
  });

  test('should multiply two numbers', () => {
    const rowInput = {
      a: 8,
      b: 4,
      action: Action.Multiply,
    };
    expect(simpleCalculator(rowInput)).toBe(32);
  });

  test('should divide two numbers', () => {
    const rowInput = {
      a: 8,
      b: 4,
      action: Action.Divide,
    };
    expect(simpleCalculator(rowInput)).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const rowInput = {
      a: 8,
      b: 4,
      action: Action.Exponentiate,
    };
    expect(simpleCalculator(rowInput)).toBe(4096);
  });

  test('should return null for invalid action', () => {
    const rowInput = {
      a: 8,
      b: 4,
      action: '',
    };
    expect(simpleCalculator(rowInput)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const rowInput = {
      a: 8,
      b: '4',
      action: Action.Add,
    };
    expect(simpleCalculator(rowInput)).toBeNull();
  });
});
