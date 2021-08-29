import User from '../models/user';
import { hashPassword, ComparePassword } from '../utils/auth';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validation
    if (!name) return res.status(400).send('Name is required');
    if (!password || password.length < 6)
      return res
        .status(400)
        .send('Password is required and should be min 6 character long');
    if (!email) return res.status(400).send('Email is required');
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send('Email is already Taken');

    // Hash Password
    const hashedPassword = await hashPassword(password);

    // Register the user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    console.log('saved user', user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error, Try again');
  }
};
