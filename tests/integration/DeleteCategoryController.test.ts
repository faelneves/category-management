import supertest from 'supertest';
import prismaInstance from '../../src/infrastructure/prisma/PrismaClient';
import { mockServer } from '../helpers';
import TestAgent from 'supertest/lib/agent';
import { categoryMock } from '../mocks/CategoryMock';

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

describe('DeleteCategoryController', () => {
  let server: TestAgent<supertest.Test>;

  beforeAll(() => {
    server = mockServer();
  });

  it('should delete a new category', async () => {
    prismaInstance.category.delete = jest.fn().mockResolvedValueOnce(categoryMock);

    return new Promise((done) => {
      server
        .delete(`/v1/category/${categoryMock.id}`)
        .send()
        .expect(204)
        .end((error, _response) => {
          expect(error).toBeNull();
          done(undefined);
        });
    });
  });

  it('should throw an 404 error category is not found', async () => {
    prismaInstance.category.delete = jest.fn().mockResolvedValueOnce(null);

    return new Promise((done) => {
      server
        .delete(`/v1/category/${categoryMock.id}`)
        .send()
        .expect(404)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body.error).toEqual('Category not found.');
          done(undefined);
        });
    });
  });
});
