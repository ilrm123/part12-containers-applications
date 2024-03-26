const express = require('express');
const router = express.Router();
const redis = require('../redis/index')

router.get('/', async (_, res) => {
    const amount = await redis.getAsync("added_todos")

    try {
      const statistics = `{"added_todos": ${amount}}`
      res.send(JSON.parse(statistics));
    } catch (error) {
      await redis.setAsync("added_todos", 0)
      const statistics = `{"added_todos": ${amount}}`
      res.send(JSON.parse(statistics));
    }
  });


module.exports = router;
