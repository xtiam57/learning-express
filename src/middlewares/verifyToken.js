const jwt = require('jsonwebtoken');
const { Forbidden } = require('../utils/errors');

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('auth-token');

    if (!token) {
      throw new Forbidden('Missing "auth-token"');
    }

    const verified = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = verified;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
