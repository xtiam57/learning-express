const hello = require('./hello');
const books = require('./books');
const authors = require('./authors');
const users = require('./users');

module.exports = {
  ...hello,
  ...books,
  ...authors,
  ...users
};
