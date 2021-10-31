import express from 'express';
import formidable from 'express-formidable';
import {
  uploadImage,
  removeImage,
  create,
  read,
  uploadVideo,
  removeVideo,
  addLesson,
  update,
} from '../controllers/course';
import { requireSignin, isInstructor } from '../middlewares';
const router = express.Router();

// aws images
router.post('/course/upload-image', requireSignin, uploadImage);
router.post('/course/remove-image', requireSignin, removeImage);

//course

router.post('/course', requireSignin, isInstructor, create);
router.put('/course/:slug', requireSignin, update);
router.get('/course/:slug', read);
router.post(
  '/course/video-upload/:instructorId',
  requireSignin,
  formidable(),
  uploadVideo
);
router.post('/course/remove-video/:instructorId', requireSignin, removeVideo);

router.post('/course/lesson/:slug/:instructorId', requireSignin, addLesson);
module.exports = router;
