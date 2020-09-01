import express from 'express';

const router = express.Router();

router
  .post('/register', async (req, res) => {
    res.send(req.body);
  })
  .post('/auth', async (req, res) => {
    res.send({
      loggedIn: true
    });
  });

export default router;
