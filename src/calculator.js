/*
Supported operations:
- add   : a + b
- sub   : a - b
- mul   : a * b
- div   : a / b
- mod   : a % b
- pow   : a ** b
- sqrt  : Math.sqrt(a)  (unary)

This module exports pure functions for each operation and performs basic validation.
*/

'use strict';

function toNumber(n) {
  const x = Number(n);
  if (!Number.isFinite(x)) {
    throw new TypeError(`Invalid number: ${n}`);
  }
  return x;
}

function add(a, b) { return toNumber(a) + toNumber(b); }
function sub(a, b) { return toNumber(a) - toNumber(b); }
function mul(a, b) { return toNumber(a) * toNumber(b); }

function div(a, b) {
  const bn = toNumber(b);
  if (bn === 0) throw new RangeError('Division by zero');
  return toNumber(a) / bn;
}

function mod(a, b) {
  const bn = toNumber(b);
  if (bn === 0) throw new RangeError('Modulo by zero');
  return toNumber(a) % bn;
}

function pow(a, b) {
  return Math.pow(toNumber(a), toNumber(b));
}

// Alias / clearer-named implementations requested in the issue
function modulo(a, b) {
  const bn = toNumber(b);
  if (bn === 0) throw new RangeError('Modulo by zero');
  return toNumber(a) % bn;
}

function power(base, exponent) {
  return Math.pow(toNumber(base), toNumber(exponent));
}

function sqrt(a) {
  const an = toNumber(a);
  if (an < 0) throw new RangeError('Square root of negative number');
  return Math.sqrt(an);
}

function squareRoot(n) {
  const nn = toNumber(n);
  if (nn < 0) throw new RangeError('Square root of negative number');
  return Math.sqrt(nn);
}

module.exports = { add, sub, mul, div, mod, modulo, pow, power, sqrt, squareRoot };
