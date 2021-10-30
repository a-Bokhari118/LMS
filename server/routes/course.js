import express from 'express';
import { uploadImage, removeImage, create } from '../controllers/course';
import { requireSignin, isInstructor } from '../middlewares';
const router = express.Router();

// aws images
router.post('/course/upload-image', requireSignin, uploadImage);
router.post('/course/remove-image', requireSignin, removeImage);

//course

router.post('/course', requireSignin, isInstructor, create);
module.exports = router;
