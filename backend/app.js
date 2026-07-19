import path from 'path';
import express from 'express';
import cors from 'cors';
import { root } from './utils/utils.js';
import searchRoute from './routes/search.js';

const app = express();

const allowedHeaders = [
  'http://127.0.0.1:8080',
  'http://localhost:8080',
  'https://movie-explorer-1-vgwi.onrender.com',
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        // if the request isn't from a browser (e.g. postman, curl, health check) it won't have an origin => allow it
        return callback(null, true);
      }

      if (allowedHeaders.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },
  }),
);

// The the simpler version would be app.use(cors({origin: allowedOrigins}))

app.use(searchRoute);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong',
  });
});
app.listen(3000);
