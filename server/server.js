import express from 'express';
import cors from 'cors';
const morgan = require('morgan');
require('dotenv').config();
import { readdirSync } from 'fs';
import mongoose from 'mongoose';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
('cookie-parser');
// Create express app

const app = express();
const csrfProtection = csrf({ cookie: true });

//DB Connection

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB Connection Error', err));

// Apply Middlewares

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// Route
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));
// csrf
app.use(csrfProtection);
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Port

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
