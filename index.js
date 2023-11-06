const express = require('express');
const redis = require('redis');
const os = require('os');
// const { Client } = require('pg');

// init app
const PORT = process.env.PORT || 4000;
const app = express();

// connect to redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('connected to redis...'));
redisClient.connect();


app.get('/', (req, res) => {
  redisClient.set('products', 'products...');
  console.log(`traffic from ${os.hostname}`);
  res.send('<h1> Hello nginx! are you doing some kind os load balancing</h1>');
});

app.get('/data', async (req, res) => {
  const products = await redisClient.get('products');
  res.send(`<h1> Hello Tresmerge!</h1> <h2>${products}</h2>`);
});

app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`));
