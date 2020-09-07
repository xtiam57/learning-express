const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {})
  .post(async (req, res, next) => {});

router
  .route('/:id')
  .get(async (req, res, next) => {})
  .put(async (req, res, next) => {})
  .delete(async (req, res, next) => {});

module.exports = router;
