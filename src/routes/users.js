const express = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { UsersValidations } = require('../validations');
const { BadRequest, Conflict, NotFound, Unauthorized } = require('../utils/errors');
const { Crypto } = require('../utils');
const { verifyToken } = require('../middlewares');

const router = express.Router();

router
  .get('/', async (req, res, next) => {
    try {
      const users = await User.find().select('-password');
      res.send(users);
    } catch (err) {
      next(err);
    }
  })

  .post('/', async (req, res, next) => {
    const { body } = req;
    const { name, email, password } = body;

    try {
      const error = UsersValidations.validateUpsert(body);

      if (error) {
        throw new BadRequest(error);
      }

      const alreadyExists = await User.findOne({ email }).select('-password');

      if (alreadyExists) {
        throw new Conflict(`The "email" (${email}) already exists`);
      }

      const hashedPassword = await Crypto.hash(password);

      const user = new User({
        name,
        email,
        password: hashedPassword
      });

      const savedUser = await user.save();

      // Remove password from final result
      let mutableUser = savedUser.toJSON();
      delete mutableUser.password;

      res.status(201).send(mutableUser);
    } catch (err) {
      next(err);
    }
  })

  .post('/login', async (req, res, next) => {
    const { body } = req;
    const { email, password } = body;

    try {
      const error = UsersValidations.validateLogin(body);

      if (error) {
        throw new BadRequest(error);
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new NotFound(`The "email" (${email}) was not found`);
      }

      const validPassword = await Crypto.compare(password, user.password);

      if (!validPassword) {
        throw new Unauthorized('Wrong "email"/"password" combination');
      }

      // Remove password from final result
      let mutableUser = user.toJSON();
      delete mutableUser.password;

      const token = jwt.sign(mutableUser, process.env.SECRET_JWT_KEY);

      res.header('auth-token', token).send(mutableUser);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
