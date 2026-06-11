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
  console.error(`Usage: calculator.js <operation> <a> <b>\n
Operations:
  add   - addition
  sub   - subtraction
  mul   - multiplication
  div   - division

Examples:
  calculator.js add 2 3
  calculator.js div 10 2`);
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

  const a = parseNumber(aRaw);
  const b = parseNumber(bRaw);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both operands must be valid numbers.');
    usage();
    process.exit(1);
  }

  let result;
  switch (cmd.toLowerCase()) {
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
    default:
      console.error(`Unknown operation: ${cmd}`);
      usage();
      process.exit(1);
  }

  // Print the result to stdout
  console.log(result);
}

// Export functions for testing or programmatic use
module.exports = { add, sub, mul, div };
