const { ApolloServer } = require('apollo-server-express');

// Definitions
const typeDefs = require('./types');
const resolvers = require('./resolvers');

// Part of the context
const services = require('../services');
const { Validator } = require('../utils');
const { validateToken } = Validator;

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req,
    res,
    validateToken,
    ...services
  }),
  playground: true,
  introspection: true
});
