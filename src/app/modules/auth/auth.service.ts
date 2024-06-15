import AppError from '../../errors/AppError';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status';

const signUp = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  const match = await bcrypt.compare(payload?.password, user?.password);
  if (!match) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password is incorrect');
  }
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    token,
    user,
  };
};

export const AuthServices = {
  signUp,
  login,
};
