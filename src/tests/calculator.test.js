const { add, sub, mul, div } = require('../calculator');
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
});
