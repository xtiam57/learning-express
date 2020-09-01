import dotenv from 'dotenv';

dotenv.config({
  path: './src/environments/.env'
});

export const { SECRET_TOKEN, APP_PORT } = process.env;
