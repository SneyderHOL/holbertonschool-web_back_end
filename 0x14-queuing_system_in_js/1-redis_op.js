import redis from 'redis';

const redisClient = redis.createClient();

redisClient.on('connect', () => {
  console.log('Redis client connected to the server');
});

redisClient.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});

function setNewSchool(schoolName, value) {
  redisClient.set(schoolName, value, redis.print);
}

function displaySchoolValue(schoolName) {
  redisClient.get(schoolName, (err, res) => {
    console.log(res);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
