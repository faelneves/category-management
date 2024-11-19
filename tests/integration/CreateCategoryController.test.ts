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

describe('CreateCategoryController', () => {
  let server: TestAgent<supertest.Test>;

  beforeAll(() => {
    server = mockServer();
  });

  it('should create a new category', async () => {
    prismaInstance.category.create = jest.fn().mockResolvedValueOnce(categoryMock);

    return new Promise((done) => {
      server
        .post(`/v1/category`)
        .send({ name: categoryMock.name })
        .expect(201)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body.id).toEqual(categoryMock.id);
          done(undefined);
        });
    });
  });

  it('should throw an 404 error when parent is not found', async () => {
    prismaInstance.category.findUnique = jest.fn().mockResolvedValueOnce(null);

    return new Promise((done) => {
      server
        .post(`/v1/category`)
        .send({ name: categoryMock.name, parentId: categoryMock.parentId })
        .expect(404)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body.error).toEqual('Category not found.');
          done(undefined);
        });
    });
  });
});
