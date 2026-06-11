const c = require('../calculator');
const { spawnSync } = require('child_process');

describe('Calculator module - basic operations (image examples)', () => {
  test('2 + 3 => 5', () => expect(c.add(2, 3)).toBe(5));
  test('10 - 4 => 6', () => expect(c.sub(10, 4)).toBe(6));
  test('45 * 2 => 90', () => expect(c.mul(45, 2)).toBe(90));
  test('20 / 5 => 4', () => expect(c.div(20, 5)).toBe(4));
});

describe('Calculator module - additional ops and edge cases', () => {
  test('modulo: 10 % 3 => 1', () => expect(c.mod(10, 3)).toBe(1));
  test('pow: 2 ** 8 => 256', () => expect(c.pow(2, 8)).toBe(256));
  test('sqrt: sqrt(16) => 4', () => expect(c.sqrt(16)).toBe(4));

  test('division by zero throws RangeError', () => {
    expect(() => c.div(1, 0)).toThrow(/division by zero/i);
  });

  test('modulo by zero throws RangeError', () => {
    expect(() => c.mod(5, 0)).toThrow(/modulo by zero/i);
  });

  test('sqrt negative throws RangeError', () => {
    expect(() => c.sqrt(-4)).toThrow(/negative/);
  });

  test('invalid numeric input throws TypeError', () => {
    expect(() => c.add('foo', 1)).toThrow(/Invalid number/);
    expect(() => c.mul(2, 'bar')).toThrow(/Invalid number/);
  });
});

describe('CLI integration (src/cli.js)', () => {
  test('CLI: 2 + 3 -> 5', () => {
    const r = spawnSync('node', ['src/cli.js', '2', '+', '3'], { encoding: 'utf8' });
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('5');
  });

  test('CLI: 10 - 4 -> 6', () => {
    const r = spawnSync('node', ['src/cli.js', '10', '-', '4'], { encoding: 'utf8' });
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('6');
  });

  test('CLI: 45 * 2 -> 90', () => {
    const r = spawnSync('node', ['src/cli.js', '45', '*', '2'], { encoding: 'utf8' });
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('90');
  });

  test('CLI: 20 / 5 -> 4', () => {
    const r = spawnSync('node', ['src/cli.js', '20', '/', '5'], { encoding: 'utf8' });
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('4');
  });

  test('CLI division by zero exits 1 and prints error', () => {
    const r = spawnSync('node', ['src/cli.js', 'div', '1', '0'], { encoding: 'utf8' });
    expect(r.status).toBe(1);
    expect((r.stderr || r.stdout)).toMatch(/division by zero/i);
  });

  test('CLI sqrt negative exits 1 and prints error', () => {
    const r = spawnSync('node', ['src/cli.js', 'sqrt', '-9'], { encoding: 'utf8' });
    expect(r.status).toBe(1);
    expect((r.stderr || r.stdout)).toMatch(/square root of negative number|negative/gi);
  });
});
