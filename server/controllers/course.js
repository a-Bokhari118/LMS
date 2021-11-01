import AWS from 'aws-sdk';
import { nanoid } from 'nanoid';
import Course from '../models/course';
import slugify from 'slugify';
import { readFileSync } from 'fs';
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      res.status(400).send('No Image');
    }

    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );
    const type = image.split(';')[0].split('/')[1];
    const params = {
      Bucket: 'lms-slade-bucket',
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      console.log(data);
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeImage = async (req, res) => {
  try {
    const { image } = req.body;
    const params = {
      Bucket: image.Bucket,
      Key: image.Key,
    };

    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }

      res.send({ ok: true });
    });
  } catch (err) {
    console.log(err);
  }
};

export const create = async (req, res) => {
  try {
    const alreadyExist = await Course.findOne({
      slug: slugify(req.body.name.toLowerCase()),
    });

    if (alreadyExist) return res.status(400).send('Title is already taken');

    const course = await new Course({
      slug: slugify(req.body.name),
      instructor: req.user._id,
      ...req.body,
    }).save();
    res.json(course);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Post Creation Faild');
  }
};

export const read = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate('instructor', '_id name')
      .exec();
    res.json(course);
  } catch (err) {
    console.log(err);
  }
};

export const uploadVideo = async (req, res) => {
  try {
    if (req.user._id != req.params.instructorId) {
      return res.status(400).send('Unauthorized');
    }
    const { video } = req.files;
    if (!video) return res.status(400).send('No Video Found');

    const params = {
      Bucket: 'lms-slade-bucket',
      Key: `${nanoid()}.${video.type.split('/')[1]}`,
      Body: readFileSync(video.path),
      ACL: 'public-read',
      ContentType: video.type,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      }
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeVideo = async (req, res) => {
  try {
    if (req.user._id != req.params.instructorId) {
      return res.status(400).send('Unauthorized');
    }
    const { Bucket, Key } = req.body;
    if (!Bucket && !Key) return res.status(400).send('No Video Found');

    const params = {
      Bucket,
      Key,
    };

    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      }
      res.send({ ok: true });
    });
  } catch (err) {
    console.log(err);
  }
};

export const addLesson = async (req, res) => {
  try {
    const { slug, instructorId } = req.params;
    const { title, content, video } = req.body;

    if (req.user._id != instructorId) {
      return res.status(400).send('Unauthorized');
    }

    const updated = await Course.findOneAndUpdate(
      { slug },
      {
        $push: { lessons: { title, content, video, slug: slugify(title) } },
      },
      { new: true }
    )
      .populate('instructor', '_id name')
      .exec();

    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Add lesson Faild');
  }
};

export const update = async (req, res) => {
  try {
    const { slug } = req.params;

    const course = await Course.findOne({ slug }).exec();

    if (req.user._id != course.instructor) {
      return res.status(400).send('Unauthorized');
    }
    // const alreadyExist = await Course.findOne({
    //   slug: slugify(req.body.name.toLowerCase()),
    // });
    // if (alreadyExist) return res.status(400).send('Title is already taken');

    const updated = await Course.findOneAndUpdate(
      { slug },
      { ...req.body, slug: slugify(req.body.name) },
      {
        new: true,
      }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

export const removeLesson = async (req, res) => {
  try {
    const { slug, lessonId } = req.params;
    const course = await Course.findOne({ slug }).exec();
    if (req.user._id != course.instructor) {
      return res.status(400).send('Unauthorized');
    }

    await Course.findByIdAndUpdate(course._id, {
      $pull: { lessons: { _id: lessonId } },
    }).exec();

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const updatedLesson = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, video, free_preview, _id } = req.body;
    const course = await Course.findOne({ slug }).select('instructor').exec();

    if (req.user._id != course.instructor._id) {
      return res.status(400).send('Unauthorized');
    }

    const updated = await Course.updateOne(
      { 'lessons._id': _id },
      {
        $set: {
          'lessons.$.title': title,
          'lessons.$.content': content,
          'lessons.$.video': video,
          'lessons.$.free_preview': free_preview,
        },
      },
      { new: true }
    ).exec();
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(400).send('Update lesson faild!');
  }
};

export const publishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).select('instructor').exec();
    if (req.user._id != course.instructor._id) {
      return res.status(400).send('Unauthorized');
    }

    const updated = await Course.findByIdAndUpdate(
      courseId,
      { published: true },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Publish Faild');
  }
};

export const unpublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).select('instructor').exec();
    if (req.user._id != course.instructor._id) {
      return res.status(400).send('Unauthorized');
    }

    const updated = await Course.findByIdAndUpdate(
      courseId,
      { published: false },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Publish Faild');
  }
};

export const courses = async (req, res) => {
  try {
    const all = await Course.find({ published: true })
      .populate('instructor', '_id name')
      .exec();
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Faild to get courses');
  }
};
