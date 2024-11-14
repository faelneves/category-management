import { PrismaCategoryRepository } from './../../../../../src/infrastructure/prisma/repositories/PrismaCategoryRepository';
import prismaInstance from '../../../../../src/infrastructure/prisma/PrismaClient';
import { CategoryMock } from '../../../../mocks/CategoryMock';
import HttpError from '../../../../../src/domain/exceptions/HttpError';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        $connect: jest.fn(),
        category: {
          create: jest.fn(),
          findUnique: jest.fn(),
          findMany: jest.fn(),
          delete: jest.fn(),
        },
      };
    }),
  };
});

describe('PrismaCategoryRepository', () => {
  describe('create', () => {
    it('should create a new category', async () => {
      prismaInstance.category.create = jest.fn().mockImplementationOnce((category) => category);
      const instance = new PrismaCategoryRepository(prismaInstance);

      const createdCategory = await instance.create(CategoryMock);

      expect(createdCategory).toEqual(createdCategory);
    });

    it('should throw an error when prisma throws', async () => {
      prismaInstance.category.create = jest.fn().mockRejectedValueOnce(new Error('Prisma error'));
      const instance = new PrismaCategoryRepository(prismaInstance);

      await expect(instance.create(CategoryMock)).rejects.toThrow(new Error('Prisma error'));
    });
  });

  describe('findById', () => {
    it('should return a category with success', async () => {
      prismaInstance.category.findUnique = jest.fn().mockResolvedValueOnce(CategoryMock);
      const instance = new PrismaCategoryRepository(prismaInstance);

      const foundCategory = await instance.findById(CategoryMock.id);

      expect(foundCategory).toEqual(CategoryMock);
    });

    it('should throw an http error when prisma returns null', async () => {
      prismaInstance.category.findUnique = jest.fn().mockResolvedValueOnce(null);
      const instance = new PrismaCategoryRepository(prismaInstance);

      await expect(instance.findById(CategoryMock.id)).rejects.toThrow(new HttpError('Category not found.', 404));
    });
  });

  describe('findByParentId', () => {
    it('should return an array of categories', async () => {
      prismaInstance.category.findMany = jest.fn().mockResolvedValueOnce([CategoryMock]);
      const instance = new PrismaCategoryRepository(prismaInstance);

      const foundCategories = await instance.findByParentId(CategoryMock.id);

      expect(foundCategories).toEqual([CategoryMock]);
    });

    it('should throw an error when prisma throws', async () => {
      prismaInstance.category.findMany = jest.fn().mockRejectedValueOnce(new Error('Prisma error'));
      const instance = new PrismaCategoryRepository(prismaInstance);

      await expect(instance.findByParentId(CategoryMock.id)).rejects.toThrow(new Error('Prisma error'));
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      prismaInstance.category.delete = jest.fn();
      const instance = new PrismaCategoryRepository(prismaInstance);

      await instance.delete(CategoryMock.id);

      expect(prismaInstance.category.delete).toHaveBeenCalledWith({ where: { id: CategoryMock.id } });
    });

    it('should throw an error when prisma throws', async () => {
      prismaInstance.category.delete = jest.fn().mockRejectedValueOnce(new Error('Prisma error'));
      const instance = new PrismaCategoryRepository(prismaInstance);

      await expect(instance.delete(CategoryMock.id)).rejects.toThrow(new Error('Prisma error'));
    });
  });
});
