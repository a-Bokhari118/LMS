import express from 'express';
import cors from 'cors';
const morgan = require('morgan');

require('dotenv').config();

// Create express app

const app = express();

// Apply Middlewares

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Route

app.get('/', (req, res) => {
  res.send('you hit server end point');
});

// Port

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
