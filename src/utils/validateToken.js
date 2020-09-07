const jwt = require('jsonwebtoken');
const { Forbidden } = require('./errors');

const validateToken = (token) => {
  if (!token) {
    throw new Forbidden('Missing header "auth-token"');
  }

  const verifiedUser = jwt.verify(token, process.env.SECRET_JWT_KEY);
  return verifiedUser;
};

module.exports = validateToken;
