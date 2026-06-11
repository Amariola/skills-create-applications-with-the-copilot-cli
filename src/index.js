#!/usr/bin/env node
// Node.js CLI Calculator (basic four operations)
// Supports: addition (+), subtraction (-), multiplication (× or *), division (÷ or /)
// Usage examples:
//   node src/index.js 2 + 3
//   node src/index.js 10 ÷ 2
//   node src/index.js add 4 5

const { calculate } = require('./calculator-basic');

function usage() {
  console.error(`Usage:
  calc <a> <operator> <b>
  calc <operation> <a> <b>

Operators / operations supported:
  +, add      - addition
  -, sub      - subtraction
  ×, *, mul   - multiplication
  ÷, /, div   - division

Examples:
  calc 2 + 3
  calc add 4 5
`);
}

function main(argv) {
  const args = argv.slice(2);
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    usage();
    process.exit(args.length === 0 ? 1 : 0);
  }

  // Support two calling styles:
  // 1) calc <a> <operator> <b>
  // 2) calc <operation> <a> <b>
  let a, op, b;
  if (args.length === 3) {
    // could be either style; detect if first is number
    const maybeNum = Number(args[0]);
    if (!Number.isNaN(maybeNum)) {
      a = args[0];
      op = args[1];
      b = args[2];
    } else {
      op = args[0];
      a = args[1];
      b = args[2];
    }
  } else {
    console.error('Error: expected three arguments.');
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

if (require.main === module) main(process.argv);
