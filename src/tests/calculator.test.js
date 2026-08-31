const test = require('node:test');
const assert = require('node:assert/strict');
const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
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

test('modulo returns the remainder of a division', () => {
  assert.equal(modulo(10, 3), 1);
  assert.equal(modulo(15, 5), 0);
  assert.equal(modulo(7, 2), 1);
});

test('power raises the base to the exponent', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(power(5, 2), 25);
  assert.equal(power(10, 0), 1);
});

test('squareRoot returns the non-negative root of a number', () => {
  assert.equal(squareRoot(9), 3);
  assert.equal(squareRoot(0), 0);
  assert.equal(squareRoot(16), 4);
});

test('evaluate supports the operation names shown in the calculator image', () => {
  assert.equal(evaluate('addition', 2, 3), 5);
  assert.equal(evaluate('subtraction', 10, 4), 6);
  assert.equal(evaluate('multiplication', 45, 2), 90);
  assert.equal(evaluate('division', 20, 5), 4);
  assert.equal(evaluate('modulo', 10, 3), 1);
  assert.equal(evaluate('power', 2, 3), 8);
  assert.equal(evaluate('sqrt', 9), 3);

  assert.equal(evaluate('+', 2, 3), 5);
  assert.equal(evaluate('-', 10, 4), 6);
  assert.equal(evaluate('*', 45, 2), 90);
  assert.equal(evaluate('/', 20, 5), 4);
  assert.equal(evaluate('%', 10, 3), 1);
  assert.equal(evaluate('^', 2, 3), 8);
});

test('division by zero throws a clear error', () => {
  assert.throws(() => division(10, 0), /Division by zero is not allowed\./);
  assert.throws(() => modulo(10, 0), /Modulo by zero is not allowed\./);
  assert.throws(() => evaluate('division', 10, 0), /Division by zero is not allowed\./);
  assert.throws(() => evaluate('modulo', 10, 0), /Modulo by zero is not allowed\./);
});

test('squareRoot rejects negative values', () => {
  assert.throws(() => squareRoot(-9), /Square root is not defined for negative numbers\./);
  assert.throws(() => evaluate('sqrt', -9), /Square root is not defined for negative numbers\./);
  assert.throws(() => squareRoot(-16), /Square root is not defined for negative numbers\./);
});

test('invalid numeric input throws an error', () => {
  assert.throws(() => evaluate('addition', 'abc', 3), /Both values must be valid numbers\./);
  assert.throws(() => evaluate('multiplication', 4, 'not-a-number'), /Both values must be valid numbers\./);
  assert.throws(() => evaluate('unknown', 2, 3), /Unsupported operation: unknown/);
});

test('parseArgs validates argument count', () => {
  assert.throws(() => parseArgs([]), /Usage: node src\/calculator\.js <operation> <number1> <number2> \| node src\/calculator\.js sqrt <number>/);
  assert.throws(() => parseArgs(['addition', 2]), /Usage: node src\/calculator\.js <operation> <number1> <number2>/);
  assert.throws(() => parseArgs(['addition', 2, 3, 4]), /Usage: node src\/calculator\.js <operation> <number1> <number2>/);
  assert.throws(() => parseArgs(['sqrt', 9, 4]), /Usage: node src\/calculator\.js sqrt <number>/);

  assert.deepEqual(parseArgs(['addition', '2', '3']), {
    operation: 'addition',
    a: '2',
    b: '3',
  });

  assert.deepEqual(parseArgs(['sqrt', '9']), {
    operation: 'sqrt',
    a: '9',
    b: undefined,
  });
});

test('evaluate handles decimal values and negative numbers correctly', () => {
  assert.equal(evaluate('addition', 1.5, 2.25), 3.75);
  assert.equal(evaluate('subtraction', -5, -2), -3);
  assert.equal(evaluate('multiplication', 2.5, 4), 10);
  assert.equal(evaluate('division', 8.4, 2), 4.2);
});
