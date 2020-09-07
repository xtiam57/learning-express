const express = require('express');
require('dotenv').config();

const apolloServer = require('./graphql');
const connectToDB = require('./config/db');
const { handleErrors } = require('./middlewares');

const { usersRouter, tasksRouter } = require('./routes');

// Starting app
const app = express();
const port = process.env.PORT || 8000;

// Connecting to MongoDB
connectToDB();

// Middlewares
app.use(express.json());

// Routers
app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);

// Error handler middleware
app.use(handleErrors);

// Root
app.get('/', (req, res) => {
  res.send({ message: 'It Works!' });
});

// Setting up graphql
apolloServer.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`API REST listening on port: ${port}`);
  console.log(`API GraphQL listening on path: ${apolloServer.graphqlPath}`);
});
