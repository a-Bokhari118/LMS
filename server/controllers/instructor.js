import Course from '../models/course';
import User from '../models/user';
export const makeInstructor = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { role: 'Instructor' } },
      { new: true }
    ).exec();
    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    console.log(err);
    return res.status(400).send('Error, Try again');
  }
};

export const CurrentInstructor = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select('-password').exec();

    if (!user.role.includes('Instructor')) {
      return res.sendStatus(403);
    } else {
      res.json({ ok: true });
    }
  } catch (error) {
    console.log(err);

    return res.status(400).send('Error, Try again');
  }
};

export const instructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id })
      .sort({ createdAt: -1 })
      .exec();
    res.json(courses);
  } catch (err) {
    console.log(err);
  }
};
