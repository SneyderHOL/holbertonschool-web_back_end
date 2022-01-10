const calculateNumber = require('./1-calcul');
const mocha = require('mocha');
const assert = require('assert');

describe('calculateNumber', () => {
  it('returns rounded sum with SUM type', () => {
    assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
    assert.strictEqual(calculateNumber('SUM', 2, 2), 4);
    assert.strictEqual(calculateNumber('SUM', 5.6, 3), 9);
    assert.strictEqual(calculateNumber('SUM', 2.2, 3.8), 6);
    assert.strictEqual(calculateNumber('SUM', -4, -3), -7);
    assert.strictEqual(calculateNumber('SUM',-1, -3.7), -5);
  });
  it('returns rounded sum with SUBTRACT type', () => {
    assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
    assert.strictEqual(calculateNumber('SUBTRACT', 2, 2), 0);
    assert.strictEqual(calculateNumber('SUBTRACT', 5.6, 3), 3);
    assert.strictEqual(calculateNumber('SUBTRACT', 2.2, 3.8), -2);
    assert.strictEqual(calculateNumber('SUBTRACT', -4, -3), -1);
    assert.strictEqual(calculateNumber('SUBTRACT',-1, -3.7), 3);
  });
  it('returns rounded sum with DIVIDE type', () => {
    assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
    assert.strictEqual(calculateNumber('DIVIDE', 2, 2), 1);
    assert.strictEqual(calculateNumber('DIVIDE', 5.6, 3), 2);
    assert.strictEqual(calculateNumber('DIVIDE', 2.2, 3.8), 0.5);
    assert.strictEqual(calculateNumber('DIVIDE', -4, -4), 1);
    assert.strictEqual(calculateNumber('DIVIDE',-1, -3.7), 0.25);
  });
  it('returns error string when DIVIDE type and b equals 0', () => {
    assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
  });
});
