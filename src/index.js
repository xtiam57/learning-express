const express = require('express');
require('dotenv').config();

const connectToDB = require('./connection');
const handleErrors = require('./middleware/handleErrors');

const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');

// Starting app
const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());

// Router
app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);

// Error handler middleware
app.use(handleErrors);

// Root
app.get('/', (req, res) => {
  res.send({
    status: 'It Works!'
  });
});

connectToDB();

app.listen(port, () => {
  console.log(`API listening on port: ${port}`);
});
