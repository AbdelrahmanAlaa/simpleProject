import { NextFunction, Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import pool from '../database/connect';

export const userAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: any;

    //   check token is send to headers

    if (req.headers.authorization?.startsWith('Bearer') && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      res.status(401).json({
        message: 'access denied , no token provided',
      });
      return;
    }

    // verify token (no change or expired )

    let decoded;
    try {
      decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    } catch (err) {
      res.status(401).json({ message: 'invalid token or expired' });
      return;
    }

    // checkUser  if user exists

    const response: any = await pool.execute(`select * from user where id = '${decoded}'`);
    const checkUser = response[0][0];
    if (!checkUser) {
      res.status(401).json({ message: 'this user not be longe available' });
      return;
    }

    req.user = checkUser;
    next();
  }
);
