import User from '../models/user';
import { hashPassword, ComparePassword } from '../utils/auth';
import jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';
import { nanoid } from 'nanoid';

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);

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
    if (!match) return res.status(400).send('Invalid Credintials');
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

// send email

export const sendTestEmail = async (req, res) => {
  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: ['abdulrhmanbokhari118@gmail.com'],
    },
    ReplyToAddresses: [process.env.EMAIL_FROM],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
            <html>
              <h1>Reset Password Link</h1>
              <p>Please use the following link to reset your password </p>
            </html>
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Password Reset Link',
      },
    },
  };

  const emailSent = SES.sendEmail(params).promise();

  emailSent
    .then((data) => {
      console.log(data);
      res.json({ ok: true });
    })
    .catch((err) => console.log(err));
};

// forgot password

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const shortCode = nanoid(6).toUpperCase();
    const user = await User.findOneAndUpdate(
      { email },
      { passwordResetCode: shortCode }
    );

    if (!user) return res.status(400).send('User Not Found');

    // Send Email
    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
              <html>
                <h1>Reset Password</h1>
                <p>Please use this code to reset your password</p>
                <h2 style='color:red;'>${shortCode}</h2>
                <i>LMS.com</i>
                <br>
                <br>
                <p><strong>Notice</strong> if you did not request a rest password please contact the support</p>
              </html>
            `,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Password Reset Code',
        },
      },
    };

    const emailSent = SES.sendEmail(params).promise();
    emailSent
      .then((data) => {
        console.log(data);
        res.json({ ok: true });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

// reset password

export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const hashedPassword = await hashPassword(newPassword);
    const user = await User.findOneAndUpdate(
      { email, passwordResetCode: code },
      { password: hashedPassword, passwordResetCode: '' }
    ).exec();
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error, Try again');
  }
};
