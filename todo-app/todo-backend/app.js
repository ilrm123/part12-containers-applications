const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const statsRouter = require('./routes/statistics');

const app = express();

const redis = require('./redis/index')

const initialize = async () => {
    let amount = await redis.getAsync("added_todos")

    if (amount != null) {
        redis.setAsync("added_todos", amount)
    } else {
        redis.setAsync("added_todos", 0)
    }
}

initialize()

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/statistics', statsRouter);

module.exports = app;
