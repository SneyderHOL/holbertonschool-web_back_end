const request = require('request');
const { expect } = require('chai');

describe('Post integration testing', () => {
  const serverUrl = 'http://localhost';
  const serverPort = '7865';
  const method = 'GET';
  const cartEndpoint = 'cart';
  const availablePaymentsEndpoint = 'available_payments';
  const loginEndpoint = 'login';
  const id = 1;
  const userName = 'testUserName';
  const wrongId = 'hello';
  const stringId = '12ab';

  describe('GET /', () => {
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

  describe(`GET /${cartEndpoint}/${id}`, () => {
    const responseText = `Payment methods for cart ${id}`;
    it('respond with 200 statusCode', (done) => {
      request(`${serverUrl}:${serverPort}/${cartEndpoint}/${id}`, method, (error, res, body) => {
        if (error) throw error;

        expect(res.statusCode).to.equal(200);
      });
      done();
    });

    it('respond with correct message', (done) => {
      request(`${serverUrl}:${serverPort}/${cartEndpoint}/${id}`, method, (error, res, body) => {
        if (error) throw error;

        expect(body).to.equal(responseText);
      });
      done();
    });
  });

  describe(`GET /${cartEndpoint}/`, () => {
    it('respond with 404 statusCode', (done) => {
      request(`${serverUrl}:${serverPort}/${cartEndpoint}/`, method, (error, res, body) => {
        if (error) throw error;

        expect(res.statusCode).to.equal(404);
      });
      done();
    });
  });

  describe(`GET /${cartEndpoint}/${wrongId}`, () => {
    it('respond with 404 statusCode', (done) => {
      request(`${serverUrl}:${serverPort}/${cartEndpoint}/${wrongId}`, method, (error, res, body) => {
        if (error) throw error;

        expect(res.statusCode).to.equal(404);
      });
      done();
    });
  });

  describe(`GET /${cartEndpoint}/${stringId}`, () => {
    it('respond with 404 statusCode', (done) => {
      request(`${serverUrl}:${serverPort}/${cartEndpoint}/${stringId}`, method, (error, res, body) => {
        if (error) throw error;

        expect(res.statusCode).to.equal(404);
      });
      done();
    });
  });

  describe(`GET /${availablePaymentsEndpoint}`, () => {
    const responseText = '{"payment_methods":{"credit_cards":true,"paypal":false}}';

    it('responds with 200 statusCode', (done) => {
      request(`${serverUrl}:${serverPort}/${availablePaymentsEndpoint}`, method, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
      done();
    });

    it('responds with correct JSON string', (done) => {
      request(`${serverUrl}:${serverPort}/${availablePaymentsEndpoint}`, method, function (error, response, body) {
        expect(response.body).to.equal(responseText);
      });
      done();
    });
  });

  describe(`POST /${loginEndpoint}`, () => {
    const method = 'POST';
    const data = { userName: userName };

    it('responds with 200 statusCode', (done) => {
      request(`${serverUrl}:${serverPort}/${loginEndpoint}`, method, data, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
      done();
    });

    it('responds with correct message', (done) => {
      request(`${serverUrl}:${serverPort}/${loginEndpoint}`, method, data, function (error, response, body) {
        expect(body).to.equal(`Welcome ${userName}`);
      });
      done();
    });
  });
});
