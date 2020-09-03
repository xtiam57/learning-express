const mutations = require('./mutations');
const queries = require('./queries');

module.exports = {
  Mutations: {
    ...mutations
  },
  Queries: {
    ...queries
  }
};
