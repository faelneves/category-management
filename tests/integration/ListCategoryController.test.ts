import supertest from 'supertest';
import prismaInstance from '../../src/infrastructure/prisma/PrismaClient';
import { mockServer } from '../helpers';
import TestAgent from 'supertest/lib/agent';
import { categoryMock, parentCategoryMock } from '../mocks/CategoryMock';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        $connect: jest.fn(),
        category: {
          create: jest.fn(),
          update: jest.fn(),
          findUnique: jest.fn(),
          findMany: jest.fn(),
          delete: jest.fn(),
        },
      };
    }),
  };
});

describe('ListCategoryController', () => {
  let server: TestAgent<supertest.Test>;

  beforeAll(() => {
    server = mockServer();
  });

  it('should return a list of categories', async () => {
    prismaInstance.category.findMany = jest.fn().mockResolvedValueOnce([categoryMock, parentCategoryMock]);

    return new Promise((done) => {
      server
        .get(`/v1/category`)
        .send()
        .expect(200)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body).toHaveLength(2);
          expect(response.body).toEqual([categoryMock, parentCategoryMock]);
          done(undefined);
        });
    });
  });

  it('should throw an 400 error when the request did not follow the schema', async () => {
    prismaInstance.category.findUnique = jest.fn().mockResolvedValueOnce(null);

    return new Promise((done) => {
      server
        .get(`/v1/category?id=123`)
        .send()
        .expect(400)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body.error).toEqual('"id" is not allowed');
          done(undefined);
        });
    });
  });
});
