import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError, Schema } from 'joi';

export const validateSchema = (schema: Schema, requestObject: 'body' | 'params' | 'query') => {
  return (request: Request, response: Response, next: NextFunction): void => {
    try {
      Joi.assert(request[requestObject], schema);
      next();
    } catch (error) {
      let errorDetails = 'Failed to validate request';

      if (error instanceof ValidationError && error.isJoi) {
        errorDetails = error.details.map((detail) => detail.message).join(', ');
      }

      response.status(400).json({ error: errorDetails });
    }
  };
};
