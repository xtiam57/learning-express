const { GeneralError } = require('../utils/errors');

const handleErrors = (err, req, res, next) => {
  console.error(err);

  if (err instanceof GeneralError) {
    return res.status(err.getCode()).send({
      status: 'error',
      code: err.getCode(),
      message: err.message
    });
  }

  return res.status(500).send({
    status: 'error',
    code: 500,
    message: err.message
  });
};

module.exports = { handleErrors };
