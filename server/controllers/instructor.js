import User from '../models/user';
export const makeInstructor = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { role: 'Instructor' } },
      { new: true }
    ).exec();
    updated.password = undefined;
    res.status(200).json(updated);
    console.log(updated);
  } catch (error) {
    console.log(err);
    return res.status(400).send('Error, Try again');
  }
};
