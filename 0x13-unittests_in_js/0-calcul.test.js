const calculateNumber = require('./0-calcul');
const mocha = require('mocha');
const assert = require('assert');

describe('calculateNumber', () => {
  describe('base case', () => {
    it('should returns rounded sum', () => {
      assert.strictEqual(calculateNumber(1, 3), 4);
      assert.strictEqual(calculateNumber(1, 3.7), 5);
      assert.strictEqual(calculateNumber(1.2, 3.7), 5);
      assert.strictEqual(calculateNumber(1.5, 3.7), 6);
    });
  });

  describe('with negative numbers', () => {
    it('should returns rounded sum', () => {
      assert.strictEqual(calculateNumber(-1.4, -3.6), -5);
      assert.strictEqual(calculateNumber(-1.4, -2.6), -4);
      assert.strictEqual(calculateNumber(-1.4, 0.6), 0);
    });
  });
});
