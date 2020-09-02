const express = require('express');
const jwt = require('jsonwebtoken');

const { User, validateUpsert, validateAuth } = require('../models/User');
const { BadRequest, Conflict, NotFound, Unauthorized } = require('../utils/errors');
const { hash, compare } = require('../utils/hash');
const auth = require('../middleware/auth');

const router = express.Router();

router
  .get('/', auth, async (req, res, next) => {
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
      const error = validateUpsert(body);

      if (error) {
        throw new BadRequest(error);
      }

      const alreadyExists = await User.findOne({ email }).select('-password');

      if (alreadyExists) {
        throw new Conflict(`The "email" (${email}) already exists`);
      }

      const hashedPassword = await hash(password);

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

  .post('/auth', async (req, res, next) => {
    const { body } = req;
    const { email, password } = body;

    try {
      const error = validateAuth(body);

      if (error) {
        throw new BadRequest(error);
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new NotFound(`The "email" (${email}) was not found`);
      }

      const validPassword = await compare(password, user.password);

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
