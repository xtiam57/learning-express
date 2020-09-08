const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('../middlewares');
const { UserServices } = require('../services');
const { UsersValidations } = require('../models/validations');
const { Errors, Crypto } = require('../utils');
const { BadRequest, Conflict, NotFound, Unauthorized } = Errors;

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await UserServices.getAll();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await UserServices.getById(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { body } = req;
  const { name, email, password } = body;

  try {
    const error = UsersValidations.validateUpsert(body);

    if (error) {
      throw new BadRequest(error);
    }

    const alreadyExists = await UserServices.getByEmail(email);

    if (alreadyExists) {
      throw new Conflict(`The "email" (${email}) already exists`);
    }

    const hashedPassword = await Crypto.hash(password);

    const user = await UserServices.save({
      name,
      email,
      password: hashedPassword
    });

    const mutable = UserServices.getMutable(user);

    res.status(201).send(mutable);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  try {
    const error = UsersValidations.validateLogin(body);

    if (error) {
      throw new BadRequest(error);
    }

    const user = await UserServices.getByEmail(email);

    if (!user) {
      throw new NotFound(`The "email" (${email}) was not found`);
    }

    const validPassword = await Crypto.compare(password, user.password);

    if (!validPassword) {
      throw new Unauthorized('Wrong "email"/"password" combination');
    }

    const mutable = UserServices.getMutable(user);

    const token = jwt.sign(mutable, process.env.SECRET_JWT_KEY, {
      expiresIn: '1h'
    });

    res.header('auth-token', token).send(mutable);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
