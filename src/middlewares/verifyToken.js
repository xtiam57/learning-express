const { Validator } = require('../utils');

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('auth-token');

    const verifiedUser = Validator.validateToken(token);

    req.user = verifiedUser;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { verifyToken };
