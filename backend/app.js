import path from 'path';
import express from 'express';
import cors from 'cors';
import { root } from './utils/utils.js';
import searchRoute from './routes/search.js';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// app.use(cors()); // use after learning manual cors handling

app.use(searchRoute);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong',
  });
});
app.listen(3000);
