import User from '../models/user';
import { hashPassword, ComparePassword } from '../utils/auth';
import jwt from 'jsonwebtoken';

// Register
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

// Login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check i user exists
    const user = await User.findOne({ email }).exec();
    if (!user) return status(400).send('No User Found');

    // Check password
    const match = await ComparePassword(password, user.password);
    // Create jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    // return user and token to client
    user.password = undefined; // do not return user password
    // send token in cookie
    res.cookie('token', token, {
      httpOnly: true,
    });
    // send user as json res
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error, Try again');
  }
};

// Logout

export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.json({ message: 'Signout success' });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error, Try again');
  }
};

// Get current user
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password').exec();
    console.log('current user', user);
    return res.json({ ok: true });
  } catch (error) {
    console.log(err);
    return res.status(400).send('Error, Try again');
  }
};
