import express from 'express';

import { SECRET_TOKEN, APP_PORT } from './settings.js';
import usersRouter from './routes/users.js';

const app = express();

// Root
app.get('/', (req, res) => {
  res.json({
    status: 'It Works!'
  });
});

// Middlewares
app.use(express.json());

// Router
app.use('/api/users', usersRouter);

app.listen(APP_PORT, () => {
  console.log(`API listening on port: ${APP_PORT}`);
});
