const { ApolloServer } = require('apollo-server-express');

// Definitions
const typeDefs = require('./types');
const resolvers = require('./resolvers');

// Part of the context
const services = require('../services');
const { validateToken } = require('../utils').Validator;

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    services,
    validateToken,
    token: req.header('auth-token')
  }),
  playground: true,
  introspection: true
});
