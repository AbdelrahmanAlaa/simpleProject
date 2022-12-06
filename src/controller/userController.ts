import { Request, Response } from 'express';
import pool from '../database/connect';
import bcrypt from 'bcrypt';

import { createUser } from '../models/userModel';
import generateToken from '../middleware/generateToken';

const User = new createUser();
export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, createAt } = req.body;

      const check = await pool.execute(`select * from user where email = '${email}'`);
      if (check)
        return res.status(404).json({
          message: 'this email is already taken',
        });

      const user = await User.create(name, email, password, createAt);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async login(req: Request, res: Response) {
    const response: any = await pool.execute(
      `select * from user where email = '${req.body.email}'`
    );
    const user = response[0][0];

    if (!user)
      return res.status(400).json({
        message: 'incorrect in email or password',
      });

    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password)
      return res.status(400).json({
        message: 'incorrect in email or password',
      });

    const token = generateToken(user.id);
    res.status(200).json({ message: 'done', token });
  }

  async getUsers(req: Request, res: Response) {
    const response: any = pool.execute('select * from user');
    const user = response[0];
    res.status(200).json({
      message: 'success',
      user,
    });
  }

  async getUserById(req: Request, res: Response) {
    const response: any = await pool.execute(`select * from user where id = ${req.params.id}`);
    const user = response[0][0];
    if (!user)
      return res.status(404).json({
        message: 'user id not found',
      });
    res.status(200).json(user);
  }
}
