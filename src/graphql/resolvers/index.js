const mutations = require('./mutations');
const queries = require('./queries');
const Author = require('./Author');
const Book = require('./Book');

module.exports = {
  Mutation: {
    ...mutations
  },
  Query: {
    ...queries
  },
  ...Author,
  ...Book
};
