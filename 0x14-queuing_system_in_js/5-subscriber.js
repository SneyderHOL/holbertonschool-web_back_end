import redis from 'redis';

const redisClient = redis.createClient();
const holbertonChannel = 'holberton school channel';

redisClient.on('connect', () => {
  console.log('Redis client connected to the server');
});

redisClient.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});

redisClient.subscribe(holbertonChannel);

redisClient.on('message', (channel, message) => {
  if (channel === holbertonChannel) {
    console.log(message);
  }

  if (message === 'KILL_SERVER') {
    redisClient.unsubscribe(holbertonChannel);
    redisClient.quit();
  }
});
