import express from 'express';
import { uploadImage, removeImage, create, read } from '../controllers/course';
import { requireSignin, isInstructor } from '../middlewares';
const router = express.Router();

// aws images
router.post('/course/upload-image', requireSignin, uploadImage);
router.post('/course/remove-image', requireSignin, removeImage);

//course

router.post('/course', requireSignin, isInstructor, create);
router.get('/course/:slug', read);
module.exports = router;
