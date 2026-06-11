#!/usr/bin/env node
'use strict';

/*
CLI for calculator (uses src/calculator.js)
Supports the following operations (names and symbols):
- add    (+)
- sub    (-)
- mul    (*, x)
- div    (/)
- mod    (mod, modulo)
- pow    (pow, power)
- sqrt   (sqrt)  -- unary

Usage examples:
  node src/cli.js add 2 3
  node src/cli.js 2 + 3
  node src/cli.js mod 10 3
  node src/cli.js pow 2 8
  node src/cli.js sqrt 16
*/

const { add, sub, mul, div, mod, pow, sqrt } = require('./calculator');

function usage() {
  console.error(`Usage:
  calculator <operation> <a> <b>
  calculator <a> <operator> <b>
  calculator sqrt <a>

Operations:
  add, +      addition
  sub, -      subtraction
  mul, *, x   multiplication
  div, /      division
  mod         modulo (remainder)
  pow         exponentiation
  sqrt        square root (unary)
`);
}

function normalizeOp(tok) {
  if (!tok) return tok;
  const s = String(tok).trim().toLowerCase();
  if (s === '+' || s === 'add') return 'add';
  if (s === '-' || s === 'sub') return 'sub';
  if (s === '*' || s === 'x' || s === '×' || s === 'mul') return 'mul';
  if (s === '/' || s === '÷' || s === 'div') return 'div';
  if (s === 'mod' || s === 'modulo') return 'mod';
  if (s === 'pow' || s === 'power') return 'pow';
  if (s === 'sqrt' || s === 'squareroot') return 'sqrt';
  return s;
}

function isUnary(op) {
  return op === 'sqrt';
}

function main(argv) {
  const args = argv.slice(2);
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    usage();
    process.exit(args.length === 0 ? 1 : 0);
  }

  // Accept either: <op> <a> <b>  OR  <a> <operator> <b>
  let op, aRaw, bRaw;
  if (args.length === 3) {
    const maybeNum = Number(args[0]);
    if (!Number.isNaN(maybeNum)) {
      // a op b
      aRaw = args[0]; op = args[1]; bRaw = args[2];
    } else {
      // op a b
      op = args[0]; aRaw = args[1]; bRaw = args[2];
    }
  } else if (args.length === 2) {
    // could be unary op: sqrt <a>
    op = args[0]; aRaw = args[1];
  } else {
    console.error('Error: unexpected number of arguments');
    usage();
    process.exit(1);
  }

  op = normalizeOp(op);

  try {
    if (isUnary(op)) {
      if (aRaw === undefined) throw new Error('Missing operand for unary operation');
      const result = sqrt(aRaw);
      console.log(result);
      process.exit(0);
    }

    if (aRaw === undefined || bRaw === undefined) {
      throw new Error('Binary operation requires two operands');
    }

    let result;
    switch (op) {
      case 'add': result = add(aRaw, bRaw); break;
      case 'sub': result = sub(aRaw, bRaw); break;
      case 'mul': result = mul(aRaw, bRaw); break;
      case 'div': result = div(aRaw, bRaw); break;
      case 'mod': result = mod(aRaw, bRaw); break;
      case 'pow': result = pow(aRaw, bRaw); break;
      default: throw new Error(`Unsupported operation: ${op}`);
    }

    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

if (require.main === module) main(process.argv);
