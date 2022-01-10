const express = require('express');

const app = express();
const port = 7865;

app.get('/', (req, res) => {
  res.end('Welcome to the payment system');
});

app.get('/cart/:id([0-9]+)', (req, res) => {
  res.send(`Payment methods for cart ${req.params.id}`);
});

app.get('/available_payments', (req, res) => {
  const jsonResponse = {
    payment_methods: {
      credit_cards: true,
      paypal: false,
    },
  };
  res.json(jsonResponse);
});

app.post('/login', (req, res) => {
  // const username = req.body.userName;
  console.log(req)
  console.log(req.body);
  // res.end(`Welcome ${username}`);
  res.end("RESP");
});

app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
})

module.exports = app;
