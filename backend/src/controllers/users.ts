import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const getSessionUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId).select('+email').exec()

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const rawPassword = req.body.password;

  try {
    if (!username || !email || !rawPassword) {
      throw createHttpError(400, 'Params missing');
    }

    const existingUsername = await UserModel.findOne({ username }).exec();
    if (existingUsername) {
      throw createHttpError(409, 'A user with this username already exists.');
    }

    const existingEmail = await UserModel.findOne({ email }).exec();
    if (existingEmail) {
      throw createHttpError(409, 'A user with this email address already exists.');
    }

    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = await UserModel.create({ username, email, password: hashedPassword });

    req.session.userId = newUser._id

    res.status(201).json(newUser)
  } catch (error) {
    next(error);
  }
};

interface SignInBody {
  username?: string,
  password?: string
}

export const signIn : RequestHandler<unknown, unknown, SignInBody, unknown> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, 'Params missing')
    }

    const user = await UserModel.findOne({username}).select('+email, +password').exec()

    if (!user) {
      throw createHttpError(401, 'Invalid credentials')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw createHttpError(401, 'Invalid credentials')
    }

    req.session.userId = user._id
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export const signOut: RequestHandler = async (req, res, next) => {
  req.session.destroy(error => {
    if (error) {
      next(error)
    } else {
      res.sendStatus(200)
    }
  })
}
