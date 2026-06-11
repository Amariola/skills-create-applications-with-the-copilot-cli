const { add, sub, mul, div, mod, pow, sqrt } = require('../calculator');
const { spawnSync } = require('child_process');

describe('calculator functions', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(sub(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(mul(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(div(20, 5)).toBe(4);
  });

  test('modulo: 10 % 3 = 1', () => {
    expect(mod(10, 3)).toBe(1);
  });

  test('exponentiation: 2 ^ 8 = 256', () => {
    expect(pow(2, 8)).toBe(256);
  });

  test('square root: sqrt(16) = 4', () => {
    expect(sqrt(16)).toBe(4);
  });

  test('division by zero (function): returns Infinity', () => {
    expect(div(1, 0)).toBe(Infinity);
  });
});

describe('CLI integration', () => {
  test('cli add returns correct stdout and exit 0', () => {
    const res = spawnSync('node', ['src/calculator.js', 'add', '2', '3'], { encoding: 'utf8' });
    expect(res.status).toBe(0);
    expect(res.stdout.trim()).toBe('5');
  });

  test('cli division by zero exits with code 1 and prints error', () => {
    const res = spawnSync('node', ['src/calculator.js', 'div', '1', '0'], { encoding: 'utf8' });
    // CLI checks division by zero and exits with code 1
    expect(res.status).toBe(1);
    expect(res.stderr).toMatch(/division by zero/i);
  });

  test('cli modulo with zero exits 1 and prints error', () => {
    const res = spawnSync('node', ['src/calculator.js', 'mod', '10', '0'], { encoding: 'utf8' });
    expect(res.status).toBe(1);
    expect(res.stderr).toMatch(/modulo by zero/i);
  });

  test('cli pow returns correct result', () => {
    const res = spawnSync('node', ['src/calculator.js', 'pow', '2', '8'], { encoding: 'utf8' });
    expect(res.status).toBe(0);
    expect(res.stdout.trim()).toBe('256');
  });

  test('cli sqrt returns correct result for positive number', () => {
    const res = spawnSync('node', ['src/calculator.js', 'sqrt', '16'], { encoding: 'utf8' });
    expect(res.status).toBe(0);
    expect(res.stdout.trim()).toBe('4');
  });

  test('cli sqrt negative number exits 1 and prints error', () => {
    const res = spawnSync('node', ['src/calculator.js', 'sqrt', '-9'], { encoding: 'utf8' });
    expect(res.status).toBe(1);
    expect(res.stderr).toMatch(/square root of negative number/i);
  });
});
