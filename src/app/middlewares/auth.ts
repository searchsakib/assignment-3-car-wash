import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRoles } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    // checking if the token is missing
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token as string,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // extracting email & role from decoded
    const { email, role } = decoded;

    const user = User.findOne({ email, role });

    // checking if the user is exist
    if (!user) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    req.user = {
      email,
      role,
    };

    next();
  });
};

export default auth;
