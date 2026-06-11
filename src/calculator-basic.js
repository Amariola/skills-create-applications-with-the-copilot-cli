// calculator-basic.js
// Supported operations: addition (+), subtraction (-), multiplication (× or *), division (÷ or /)
// This module provides the four basic arithmetic functions and a calculate helper.

function toNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) throw new TypeError(`Invalid number: ${value}`);
  return n;
}

function add(a, b) {
  return toNumber(a) + toNumber(b);
}

function subtract(a, b) {
  return toNumber(a) - toNumber(b);
}

function multiply(a, b) {
  return toNumber(a) * toNumber(b);
}

function divide(a, b) {
  const divisor = toNumber(b);
  if (divisor === 0) throw new RangeError('Division by zero');
  return toNumber(a) / divisor;
}

function normalizeOperator(op) {
  if (typeof op !== 'string') return op;
  return op.trim().replace(/^x$/i, '*').replace(/×/gu, '*').replace(/÷/gu, '/');
}

function calculate(op, a, b) {
  const operator = normalizeOperator(op);
  switch (operator) {
    case '+':
    case 'add':
      return add(a, b);
    case '-':
    case 'sub':
      return subtract(a, b);
    case '*':
    case 'mul':
      return multiply(a, b);
    case '/':
    case 'div':
      return divide(a, b);
    default:
      throw new Error(`Unsupported operator: ${op}`);
  }
}

module.exports = { add, subtract, multiply, divide, calculate };
