const request = require('request');
const { expect } = require('chai');

describe('Basic integration testing', () => {
  describe('GET /', () => {
    const serverUrl = 'http://localhost';
    const serverPort = '7865';
    const method = 'GET';
    const responseText = 'Welcome to the payment system';

    it('respond with 200 statusCode', (done) => {
      request(`${serverUrl}:${serverPort}`, method, (error, res, body) => {
        if (error) throw error;

        expect(res.statusCode).to.equal(200); 
      });
      done();
    });

    it('respond with correct message', (done) => {
      request(`${serverUrl}:${serverPort}`, method, (error, res, body) => {
        if (error) throw error;

        expect(body).to.equal(responseText);
      });
      done();
    });
  });
});
