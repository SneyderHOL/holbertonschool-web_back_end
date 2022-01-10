const { expect } = require('chai');
const sinon = require('sinon');
const sendPaymentRequestToApi = require('./3-payment');
const Utils = require('./utils');

describe('sendPaymentRequestToApi', () => {
  it('should call Utils.calculateNumber', () => {
    const utilSpy = sinon.spy(Utils, 'calculateNumber');
    const consoleSpy = sinon.spy(console, 'log');

    sendPaymentRequestToApi(100, 20);

    expect(utilSpy.calledOnceWithExactly('SUM', 100, 20)).to.equal(true);
    expect (consoleSpy.calledWithExactly('The total is: 120')).to.equal(true);

    utilSpy.restore();
    consoleSpy.restore();
  });
});
