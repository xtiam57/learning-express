const Joi = require('joi');

const { Validator } = require('../utils');

// Validations
const UpsertSchema = Joi.object({
  name: Joi.string().required().min(2).max(255),
  email: Joi.string().required().email().min(6).max(255),
  password: Joi.string().required().min(5).max(255)
});

const LoginSchema = Joi.object({
  email: Joi.string().required().email().min(6).max(255),
  password: Joi.string().required().min(5).max(255)
});

const validateUpsert = (data) => Validator.validate(UpsertSchema, data);
const validateLogin = (data) => Validator.validate(LoginSchema, data);

module.exports = { validateUpsert, validateLogin };
