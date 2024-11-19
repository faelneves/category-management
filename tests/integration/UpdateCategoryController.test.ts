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

describe('UpdateCategoryController', () => {
  let server: TestAgent<supertest.Test>;

  beforeAll(() => {
    server = mockServer();
  });

  it('should update a category', async () => {
    prismaInstance.category.update = jest.fn().mockResolvedValueOnce(parentCategoryMock);
    prismaInstance.category.findUnique = jest.fn().mockResolvedValueOnce(parentCategoryMock);

    return new Promise((done) => {
      server
        .patch(`/v1/category/${parentCategoryMock.id}`)
        .send()
        .expect(200)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body).toEqual(parentCategoryMock);
          done(undefined);
        });
    });
  });

  it('should throw an 404 error category is not found', async () => {
    prismaInstance.category.findUnique = jest.fn().mockResolvedValueOnce(null);

    return new Promise((done) => {
      server
        .get(`/v1/category/${categoryMock.id}`)
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
