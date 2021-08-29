import express from 'express';
import { register } from '../controllers/auth';
const router = express.Router();

router.post('/register', register);

module.exports = router;
