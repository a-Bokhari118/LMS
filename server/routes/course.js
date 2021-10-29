import express from 'express';
import { uploadImage, removeImage } from '../controllers/course';
import { requireSignin } from '../middlewares';
const router = express.Router();

router.post('/course/upload-image', requireSignin, uploadImage);
router.post('/course/remove-image', requireSignin, removeImage);

module.exports = router;
