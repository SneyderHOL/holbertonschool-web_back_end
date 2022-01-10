const { expect } = require('chai');
const sinon = require('sinon');

const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', () => {
  describe('with success response', () => {
    it('should resolve promise response from API ', (done) => {
      getPaymentTokenFromAPI(true)
        .then((response) => {
          expect(response).to.include({ data: 'Successful response from the API' });
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
