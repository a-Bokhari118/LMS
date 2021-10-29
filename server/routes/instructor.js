import express from 'express';
import { makeInstructor, CurrentInstructor } from '../controllers/instructor';
import { requireSignin } from '../middlewares';
const router = express.Router();

router.post('/make-instructor', requireSignin, makeInstructor);
router.get('/current-instructor', requireSignin, CurrentInstructor);

module.exports = router;
