import mongoose from 'mongoose';

const { Schema } = mongoose;

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 150,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    content: {
      type: {},

      minlength: 200,
    },
    video_link: {
      type: {},
      free_preview: {
        type: Boolean,
        default: false,
      },
    },
  },

  { timestamps: true }
);

const courseSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 150,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: {},
      minlength: 200,
    },
    price: {
      type: Number,
      default: 9.99,
    },
    image: {
      type: {},
    },
    category: String,
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    instructor: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    lessons: [lessonSchema],
  },

  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
