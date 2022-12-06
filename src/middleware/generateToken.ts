import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (body: Object): string => {
  const token = jwt.sign(body, `${process.env.JWT_SECRET}`);
  return token;
};

export default generateToken;
