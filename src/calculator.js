#!/usr/bin/env node

/**
 * Basic CLI calculator for the supported arithmetic operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - exponentiation (power)
 * - square root
 *
 * This matches the calculator shown in the design image and the repository issue.
 */

function addition(a, b) {
  return Number(a) + Number(b);
}

function subtraction(a, b) {
  return Number(a) - Number(b);
}

function multiplication(a, b) {
  return Number(a) * Number(b);
}

function division(a, b) {
  if (Number(b) === 0) {
    throw new Error('Division by zero is not allowed.');
  }

  return Number(a) / Number(b);
}

function modulo(a, b) {
  if (Number(b) === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return Number(a) % Number(b);
}

function power(base, exponent) {
  return Number(base) ** Number(exponent);
}

function squareRoot(n) {
  const value = Number(n);

  if (value < 0) {
    throw new Error('Square root is not defined for negative numbers.');
  }

  return Math.sqrt(value);
}

function evaluate(operation, a, b) {
  const normalizedOperation = String(operation).trim().toLowerCase();
  const numericA = Number(a);
  const numericB = Number(b);

  switch (normalizedOperation) {
    case 'sqrt':
    case 'squareroot':
      if (!Number.isFinite(numericA)) {
        throw new Error('Value must be a valid number.');
      }
      return squareRoot(numericA);
    default:
      if (!Number.isFinite(numericA) || !Number.isFinite(numericB)) {
        throw new Error('Both values must be valid numbers.');
      }
  }

  switch (normalizedOperation) {
    case 'add':
    case 'plus':
    case '+':
    case 'addition':
      return addition(numericA, numericB);
    case 'subtract':
    case 'minus':
    case '-':
    case 'subtraction':
      return subtraction(numericA, numericB);
    case 'multiply':
    case 'times':
    case '*':
    case 'multiplication':
      return multiplication(numericA, numericB);
    case 'divide':
    case '/':
    case 'division':
      return division(numericA, numericB);
    case 'mod':
    case 'modulo':
    case '%':
      return modulo(numericA, numericB);
    case 'power':
    case 'pow':
    case '^':
    case 'exponentiation':
      return power(numericA, numericB);
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function parseArgs(args) {
  if (!Array.isArray(args) || args.length === 0) {
    throw new Error('Usage: node src/calculator.js <operation> <number1> <number2> | node src/calculator.js sqrt <number>');
  }

  const [operation, left, right] = args;
  const normalizedOperation = String(operation).trim().toLowerCase();

  if (['sqrt', 'squareroot'].includes(normalizedOperation)) {
    if (args.length !== 2) {
      throw new Error('Usage: node src/calculator.js sqrt <number>');
    }
    return { operation, a: left, b: undefined };
  }

  if (args.length !== 3) {
    throw new Error('Usage: node src/calculator.js <operation> <number1> <number2> | node src/calculator.js sqrt <number>');
  }

  return { operation, a: left, b: right };
}

function printUsage() {
  const examples = [
    'node src/calculator.js addition 10 5',
    'node src/calculator.js subtraction 10 5',
    'node src/calculator.js multiplication 10 5',
    'node src/calculator.js division 10 5',
    'node src/calculator.js modulo 10 3',
    'node src/calculator.js power 2 3',
    'node src/calculator.js sqrt 9',
  ];

  console.log('Basic CLI calculator');
  console.log('Supported operations: addition, subtraction, multiplication, division, modulo, power, square root');
  console.log('Examples:');
  examples.forEach((example) => console.log(`  ${example}`));
}

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  try {
    const { operation, a, b } = parseArgs(args);
    const result = evaluate(operation, a, b);
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  evaluate,
  parseArgs,
};
