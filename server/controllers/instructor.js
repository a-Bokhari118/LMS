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
