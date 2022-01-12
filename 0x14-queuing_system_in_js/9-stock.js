const express = require('express');
const redis = require('redis');
const promisify = require('util').promisify;

const listProducts = [
  {
    itemId: 1,
    itemName: 'Suitcase 250',
    price: 50,
    initialAvailableQuantity: 4,
  },
  {
    itemId: 2,
    itemName: 'Suitcase 450',
    price: 100,
    initialAvailableQuantity: 10,
  },
  {
    itemId: 3,
    itemName: 'Suitcase 650',
    price: 350,
    initialAvailableQuantity: 2,
  },
  {
    itemId: 4,
    itemName: 'Suitcase 1050',
    price: 550,
    initialAvailableQuantity: 5,
  },
];
const app = express();
const port = 1245;
const productNotFound = { status: 'Product not found' };
const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);

function getItemById(id) {
  return listProducts.filter((item) => item.itemId === id)[0];
}

function reserveStockById(itemId, stock) {
  redisClient.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock;
}

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = Number(req.params.itemId);
  const item = getItemById(itemId);

  if (!item) {
    return res.json(productNotFound);
  }

  const currentStock = await getCurrentReservedStockById(itemId);
  const stock =
    currentStock !== null ? currentStock : item.initialAvailableQuantity;

  item.currentQuantity = stock;
  res.json(item);
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = Number(req.params.itemId);
  const item = getItemById(itemId);
  const noStock = { status: 'Not enough stock available', itemId };
  const reservationConfirmed = { status: 'Reservation confirmed', itemId };

  if (!item) {
    res.json(productNotFound);
    return;
  }

  let currentStock = await getCurrentReservedStockById(itemId);
  if (currentStock === null) currentStock = item.initialAvailableQuantity;

  if (currentStock <= 0) {
    res.json(noStock);
    return;
  }

  reserveStockById(itemId, Number(currentStock) - 1);

  res.json(reservationConfirmed);
});

redisClient.on('connect', () => {
  console.log('Redis client connected to the server');
});

redisClient.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});
