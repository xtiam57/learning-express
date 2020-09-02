const express = require('express');
const dotenv = require('dotenv');

const connectToDB = require('./connection');
const handleErrors = require('./middleware/handleErrors');

const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');

// Getting environments variables
dotenv.config({ path: './src/environments/.env' });
const { APP_PORT } = process.env;

// Starting app
const app = express();

// Middlewares
app.use(express.json());

// Router
app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);

// Error handler middleware
app.use(handleErrors);

// Root
app.get('/', (req, res) => {
  res.json({
    status: 'It Works!'
  });
});

connectToDB();

app.listen(process.env.APP_PORT, () => {
  console.log(`API listening on port: ${process.env.APP_PORT}`);
});
