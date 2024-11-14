import { Request } from 'express';
import { faker } from '@faker-js/faker';
import { validateSchema } from '../../../src/application/v1/middlewares/ValidateSchema';
import createCategorySchema from '../../../src/application/v1/schemas/CreateCategorySchema';

describe('validateSchema', () => {
  describe('createCategorySchema', () => {
    it('should allow a complete body on request', async () => {
      const req = {
        body: {
          name: faker.person.firstName(),
          parentId: faker.string.uuid(),
          active: faker.datatype.boolean(),
        },
      } as unknown as Request;
      const res: any = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };

      const next = jest.fn();

      validateSchema(createCategorySchema, 'body')(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should not allow request without name on body', async () => {
      const req = {
        body: {
          parentId: faker.string.uuid(),
          active: faker.datatype.boolean(),
        },
      } as unknown as Request;
      const res: any = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };

      validateSchema(createCategorySchema, 'body')(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: `"name" is required`,
      });
    });
  });
});
