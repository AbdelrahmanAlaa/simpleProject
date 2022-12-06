import Joi from 'joi';

export const registerSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.ref('password'),
  email: Joi.string().email().required(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
