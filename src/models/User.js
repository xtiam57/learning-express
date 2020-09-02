const mongoose = require('mongoose');
const Joi = require('joi');

const validator = require('../utils/validator');

// Model
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 255
    },
    email: {
      type: String,
      required: true,
      maxlength: 255
    },
    password: {
      type: String,
      required: true,
      maxlength: 1024
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id;
  }
});

const User = mongoose.model('User', UserSchema);

// Validations
const UpsertValidation = Joi.object({
  name: Joi.string().required().min(2).max(255),
  email: Joi.string().required().email().min(6).max(255),
  password: Joi.string().required().min(5).max(255)
});

const AuthValidation = Joi.object({
  email: Joi.string().required().email().min(6).max(255),
  password: Joi.string().required().min(5).max(255)
});

const validateUpsert = (data) => validator(UpsertValidation, data);
const validateAuth = (data) => validator(AuthValidation, data);

module.exports = { User, validateUpsert, validateAuth };
