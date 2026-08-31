const test = require('node:test');
const assert = require('node:assert/strict');
const {
  addition,
  subtraction,
  multiplication,
  division,
  evaluate,
  parseArgs,
} = require('../calculator.js');

test('addition returns the sum of two numbers', () => {
  assert.equal(addition(2, 3), 5);
  assert.equal(addition(-2, 3), 1);
  assert.equal(addition(0, 0), 0);
});

test('subtraction returns the difference of two numbers', () => {
  assert.equal(subtraction(10, 4), 6);
  assert.equal(subtraction(4, 10), -6);
  assert.equal(subtraction(0, 0), 0);
});

test('multiplication returns the product of two numbers', () => {
  assert.equal(multiplication(45, 2), 90);
  assert.equal(multiplication(-3, 4), -12);
  assert.equal(multiplication(7, 0), 0);
});

test('division returns the quotient of two numbers', () => {
  assert.equal(division(20, 5), 4);
  assert.equal(division(9, 3), 3);
  assert.equal(division(7, 2), 3.5);
});

test('evaluate supports the operation names shown in the calculator image', () => {
  assert.equal(evaluate('addition', 2, 3), 5);
  assert.equal(evaluate('subtraction', 10, 4), 6);
  assert.equal(evaluate('multiplication', 45, 2), 90);
  assert.equal(evaluate('division', 20, 5), 4);

  assert.equal(evaluate('+', 2, 3), 5);
  assert.equal(evaluate('-', 10, 4), 6);
  assert.equal(evaluate('*', 45, 2), 90);
  assert.equal(evaluate('/', 20, 5), 4);
});

test('division by zero throws a clear error', () => {
  assert.throws(() => division(10, 0), /Division by zero is not allowed\./);
  assert.throws(() => evaluate('division', 10, 0), /Division by zero is not allowed\./);
});

test('invalid numeric input throws an error', () => {
  assert.throws(() => evaluate('addition', 'abc', 3), /Both values must be valid numbers\./);
  assert.throws(() => evaluate('multiplication', 4, 'not-a-number'), /Both values must be valid numbers\./);
  assert.throws(() => evaluate('unknown', 2, 3), /Unsupported operation: unknown/);
});

test('parseArgs validates argument count', () => {
  assert.throws(() => parseArgs([]), /Usage: node src\/calculator\.js <operation> <number1> <number2>/);
  assert.throws(() => parseArgs(['addition', 2]), /Usage: node src\/calculator\.js <operation> <number1> <number2>/);
  assert.throws(() => parseArgs(['addition', 2, 3, 4]), /Usage: node src\/calculator\.js <operation> <number1> <number2>/);

  assert.deepEqual(parseArgs(['addition', '2', '3']), {
    operation: 'addition',
    a: '2',
    b: '3',
  });
});

test('evaluate handles decimal values and negative numbers correctly', () => {
  assert.equal(evaluate('addition', 1.5, 2.25), 3.75);
  assert.equal(evaluate('subtraction', -5, -2), -3);
  assert.equal(evaluate('multiplication', 2.5, 4), 10);
  assert.equal(evaluate('division', 8.4, 2), 4.2);
});
