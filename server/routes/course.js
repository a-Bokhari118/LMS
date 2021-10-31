import express from 'express';
import formidable from 'express-formidable';
import {
  uploadImage,
  removeImage,
  create,
  read,
  uploadVideo,
} from '../controllers/course';
import { requireSignin, isInstructor } from '../middlewares';
const router = express.Router();

// aws images
router.post('/course/upload-image', requireSignin, uploadImage);
router.post('/course/remove-image', requireSignin, removeImage);

//course

router.post('/course', requireSignin, isInstructor, create);
router.get('/course/:slug', read);
router.post('/course/video-upload', requireSignin, formidable(), uploadVideo);
module.exports = router;
