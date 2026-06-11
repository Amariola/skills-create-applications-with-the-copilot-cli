#!/usr/bin/env node
/*
  Node.js CLI Calculator

  Supported operations:
  - addition (add)
  - subtraction (sub)
  - multiplication (mul)
  - division (div)

  Usage examples:
    node src/calculator.js add 2 3
    node src/calculator.js mul 4 5
    node src/calculator.js div 10 2

  The script prints the numeric result to stdout and uses exit code 1 on error.
*/

'use strict';

function usage() {
  console.error(`Usage:
  calculator.js <operation> <a> <b>
  calculator.js sqrt <a>

Operations:
  add   - addition
  sub   - subtraction
  mul   - multiplication
  div   - division
  mod   - modulo (remainder)
  pow   - exponentiation (a ^ b)
  sqrt  - square root (unary)

Examples:
  calculator.js add 2 3
  calculator.js div 10 2
  calculator.js mod 10 3
  calculator.js pow 2 8
  calculator.js sqrt 16`);
}

function parseNumber(s) {
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mul(a, b) { return a * b; }
function div(a, b) { return a / b; }

// CLI entry point only when executed directly
if (require.main === module) {
  const [,, cmd, aRaw, bRaw] = process.argv;

  if (!cmd || cmd === '--help' || cmd === '-h') {
    usage();
    process.exit(cmd ? 0 : 1);
  }

  const op = (cmd || '').toLowerCase();

  // Unary operations set (supports 'sqrt' and 'squareroot')
  const unaryOps = new Set(['sqrt', 'squareroot']);

  if (unaryOps.has(op)) {
    const a = parseNumber(aRaw);
    if (Number.isNaN(a)) {
      console.error('Error: operand must be a valid number for ' + op + '.');
      usage();
      process.exit(1);
    }
    if (a < 0) {
      console.error('Error: square root of negative number');
      process.exit(1);
    }
    console.log(squareRoot(a));
    process.exit(0);
  }

  // Binary operations
  const a = parseNumber(aRaw);
  const b = parseNumber(bRaw);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both operands must be valid numbers.');
    usage();
    process.exit(1);
  }

  let result;
  switch (op) {
    case 'add':
      result = add(a, b);
      break;
    case 'sub':
      result = sub(a, b);
      break;
    case 'mul':
      result = mul(a, b);
      break;
    case 'div':
      if (b === 0) {
        console.error('Error: division by zero');
        process.exit(1);
      }
      result = div(a, b);
      break;
    case 'mod':
    case 'modulo':
      if (b === 0) {
        console.error('Error: modulo by zero');
        process.exit(1);
      }
      result = mod(a, b);
      break;
    case 'pow':
    case 'power':
      result = pow(a, b);
      break;
    default:
      console.error(`Unknown operation: ${cmd}`);
      usage();
      process.exit(1);
  }

  // Print the result to stdout
  console.log(result);
}

// Export functions for testing or programmatic use

// Modulo: remainder of a divided by b
function modulo(a, b) {
  return a % b;
}
function mod(a, b) { return modulo(a, b); }

// Power: base raised to exponent
function power(base, exponent) {
  return Math.pow(base, exponent);
}
function pow(a, b) { return power(a, b); }

// Square root with error handling for negative inputs
function squareRoot(n) {
  if (n < 0) {
    throw new Error('square root of negative number');
  }
  return Math.sqrt(n);
}
function sqrt(a) { return squareRoot(a); }

module.exports = { add, sub, mul, div, mod, pow, sqrt, modulo, power, squareRoot };
