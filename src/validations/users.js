const Joi = require('joi');

const { Validator } = require('../utils');

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
  validateUpsert: (data) => Validator.validateModel(UpsertSchema, data),
  validateLogin: (data) => Validator.validateModel(LoginSchema, data)
};
