const calculateNumber = require('./2-calcul_chai');
const { expect } = require('chai');

describe('calculateNumber', () => {
  it('returns rounded sum with SUM type', () => {
    expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
    expect(calculateNumber('SUM', 2, 2)).to.equal(4);
    expect(calculateNumber('SUM', 5.6, 3)).to.equal(9);
    expect(calculateNumber('SUM', 2.2, 3.8)).to.equal(6);
    expect(calculateNumber('SUM', -4, -3)).to.equal(-7);
    expect(calculateNumber('SUM', -1, -3.7)).to.equal(-5);
  });
  it('returns rounded sum with SUBTRACT type', () => {
    expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
    expect(calculateNumber('SUBTRACT', 2, 2)).to.equal(0);
    expect(calculateNumber('SUBTRACT', 5.6, 3)).to.equal(3);
    expect(calculateNumber('SUBTRACT', 2.2, 3.8)).to.equal(-2);
    expect(calculateNumber('SUBTRACT', -4, -3)).to.equal(-1);
    expect(calculateNumber('SUBTRACT',-1, -3.7)).to.equal(3);
  });
  it('returns rounded sum with DIVIDE type', () => {
    expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
    expect(calculateNumber('DIVIDE', 2, 2)).to.equal(1);
    expect(calculateNumber('DIVIDE', 5.6, 3)).to.equal(2);
    expect(calculateNumber('DIVIDE', 2.2, 3.8)).to.equal(0.5);
    expect(calculateNumber('DIVIDE', -4, -4)).to.equal(1);
    expect(calculateNumber('DIVIDE',-1, -3.7)).to.equal(0.25);
  });
  it('returns error string when DIVIDE type and b equals 0', () => {
    expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
  });
});
