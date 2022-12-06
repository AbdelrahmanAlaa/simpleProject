import Joi from 'joi';

export const createSchema = Joi.object().keys({
  title: Joi.string().min(3).required(),
  price: Joi.number().min(2).required(),
  image: Joi.any().required(),
});

export const updateSchema = Joi.object().keys({
  title: Joi.string().min(3).optional(),
  price: Joi.number().min(2).optional(),
  image: Joi.any().optional(),
});
