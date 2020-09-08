const Errors = require('./errors');
const Crypto = require('./crypto');
const validateToken = require('./validateToken');

module.exports = {
  Errors,
  Crypto,
  Validator: {
    validateToken
  }
};
