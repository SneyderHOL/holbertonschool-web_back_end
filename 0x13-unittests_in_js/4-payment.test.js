const { expect } = require('chai');
const sinon = require('sinon');
const sendPaymentRequestToApi = require('./4-payment');
const Utils = require('./utils');

describe('sendPaymentRequestToApi', () => {
  it('should call Util.calculateNumber', () => {
    const utilStub = sinon.stub(Utils, 'calculateNumber');
    utilStub.returns(10);
    
    const consoleSpy = sinon.spy(console, 'log');

    const apiRequest = sendPaymentRequestToApi(100, 20);

    expect(utilStub.calledOnceWithExactly('SUM', 100, 20)).to.equal(true);
    expect (consoleSpy.calledWithExactly('The total is: 10')).to.equal(true);
    expect(Utils.calculateNumber('SUM', 100, 20)).to.equal(apiRequest);

    utilStub.restore();
    consoleSpy.restore();
  });
});
