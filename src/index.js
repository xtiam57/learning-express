const express = require('express');
require('dotenv').config();

const apolloServer = require('./graphql/server');
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

// Connecting to MongoDB
connectToDB();

// Setting up graphql
apolloServer.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`API REST listening on port: ${port}`);
  console.log(`API GraphQL listening on path: ${apolloServer.graphqlPath}`);
});
