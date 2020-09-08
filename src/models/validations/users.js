const Joi = require('joi');

const { validateSchema } = require('./validateSchema');

// PUT and POST
const UpsertSchema = Joi.object({
  name: Joi.string().required().min(2).max(255),
  email: Joi.string().required().email().min(6).max(255),
  password: Joi.string().required().min(5).max(255)
});

// Login
const LoginSchema = Joi.object({
  email: Joi.string().required().email().min(6).max(255),
  password: Joi.string().required().min(5).max(255)
});

module.exports = {
  validateUpsert: (data) => validateSchema(UpsertSchema, data),
  validateLogin: (data) => validateSchema(LoginSchema, data)
};
