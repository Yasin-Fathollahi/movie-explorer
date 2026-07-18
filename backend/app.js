import path from 'path';
import express from 'express';
import cors from 'cors';
import { root } from './utils/utils.js';
import searchRoute from './routes/search.js';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// app.use(cors({ origin: 'http://127.0.0.1:8080' })); // use after learning manual cors handling

app.use(searchRoute);

app.use((err, req, res, next) => {
  // Error handler middleware
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

app.listen(3000);
