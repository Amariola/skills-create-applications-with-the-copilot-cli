#!/usr/bin/env node
/*
  Node.js CLI Calculator (basic four operations only)

  Supported operations (as requested, based only on the image):
  - addition       (add or +)
  - subtraction    (sub or -)
  - multiplication (mul, x, × or *)
  - division       (div or ÷ or /)

  This file provides a small programmatic API and a CLI wrapper.
  The CLI prints the numeric result to stdout and exits with code 1 on error.

  Examples:
    node src/calculator.js add 2 3
    node src/calculator.js 2 + 3
    node src/calculator.js 10 ÷ 2
*/

'use strict';

function usage() {
  console.error(`Usage:
  calculator.js <a> <operator> <b>
  calculator.js <operation> <a> <b>

Operators / operations supported:
  +, add      - addition
  -, sub      - subtraction
  ×, *, mul   - multiplication
  ÷, /, div   - division

Examples:
  calculator.js 2 + 3
  calculator.js add 4 5
`);
}

function toNumber(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) throw new TypeError(`Invalid number: ${v}`);
  return n;
}

// Basic arithmetic operations
function add(a, b) { return toNumber(a) + toNumber(b); }
function sub(a, b) { return toNumber(a) - toNumber(b); }
function mul(a, b) { return toNumber(a) * toNumber(b); }
function div(a, b) {
  const denom = toNumber(b);
  if (denom === 0) throw new RangeError('Division by zero');
  return toNumber(a) / denom;
}

// Normalize operator tokens to canonical forms used by calculate()
function normalizeOperator(op) {
  if (typeof op !== 'string') return op;
  const s = op.trim().toLowerCase();
  if (s === 'add' || s === '+') return '+';
  if (s === 'sub' || s === '-') return '-';
  if (s === 'mul' || s === 'x' || s === '×' || s === '*') return '*';
  if (s === 'div' || s === '÷' || s === '/') return '/';
  return op;
}

function calculate(op, a, b) {
  const operator = normalizeOperator(op);
  switch (operator) {
    case '+': return add(a, b);
    case '-': return sub(a, b);
    case '*': return mul(a, b);
    case '/': return div(a, b);
    default: throw new Error(`Unsupported operator: ${op}`);
  }
}

// CLI entrypoint
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    usage();
    process.exit(args.length === 0 ? 1 : 0);
  }

  // Support: "a op b" or "op a b"
  let a, b, op;
  if (args.length === 3) {
    const maybeNum = Number(args[0]);
    if (!Number.isNaN(maybeNum)) {
      a = args[0]; op = args[1]; b = args[2];
    } else {
      op = args[0]; a = args[1]; b = args[2];
    }
  } else {
    console.error('Error: expected three arguments (operation and two operands).');
    usage();
    process.exit(1);
  }

  try {
    const result = calculate(op, a, b);
    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

// Export for programmatic use / testing
module.exports = { add, sub, mul, div, calculate };


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
