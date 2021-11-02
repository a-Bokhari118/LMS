import express from 'express';
import {
  makeInstructor,
  CurrentInstructor,
  instructorCourses,
  studentCount,
} from '../controllers/instructor';
import { requireSignin } from '../middlewares';
const router = express.Router();

router.post('/make-instructor', requireSignin, makeInstructor);
router.get('/current-instructor', requireSignin, CurrentInstructor);
router.get('/instructor-courses', requireSignin, instructorCourses);

router.post('/instructor/student-count', requireSignin, studentCount);
module.exports = router;
