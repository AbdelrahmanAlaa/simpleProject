import { NextFunction, Request, Response } from 'express';

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(404).json({
        status: 'failed',
        message: error.details[0].message,
      });
    }

    return next();
  };
};
