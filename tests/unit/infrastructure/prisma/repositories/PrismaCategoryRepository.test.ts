import { PrismaCategoryRepository } from './../../../../../src/infrastructure/prisma/repositories/PrismaCategoryRepository';
import prismaInstance from '../../../../../src/infrastructure/prisma/PrismaClient';
import { categoryMock } from '../../../../mocks/CategoryMock';
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

      const createdCategory = await instance.create(categoryMock);

      expect(createdCategory).toEqual(createdCategory);
    });

    it('should throw an error when prisma throws', async () => {
      prismaInstance.category.create = jest.fn().mockRejectedValueOnce(new Error('Prisma error'));
      const instance = new PrismaCategoryRepository(prismaInstance);

      await expect(instance.create(categoryMock)).rejects.toThrow(new Error('Prisma error'));
    });
  });

  describe('findById', () => {
    it('should return a category with success', async () => {
      prismaInstance.category.findUnique = jest.fn().mockResolvedValueOnce(categoryMock);
      const instance = new PrismaCategoryRepository(prismaInstance);

      const foundCategory = await instance.findById(categoryMock.id);

      expect(foundCategory).toEqual(categoryMock);
    });

    it('should throw an http error when prisma returns null', async () => {
      prismaInstance.category.findUnique = jest.fn().mockResolvedValueOnce(null);
      const instance = new PrismaCategoryRepository(prismaInstance);

      await expect(instance.findById(categoryMock.id)).rejects.toThrow(new HttpError('Category not found.', 404));
    });
  });

  describe('findByParentId', () => {
    it('should return an array of categories', async () => {
      prismaInstance.category.findMany = jest.fn().mockResolvedValueOnce([categoryMock]);
      const instance = new PrismaCategoryRepository(prismaInstance);

      const foundCategories = await instance.findByParentId(categoryMock.id);

      expect(foundCategories).toEqual([categoryMock]);
    });

    it('should throw an error when prisma throws', async () => {
      prismaInstance.category.findMany = jest.fn().mockRejectedValueOnce(new Error('Prisma error'));
      const instance = new PrismaCategoryRepository(prismaInstance);

      await expect(instance.findByParentId(categoryMock.id)).rejects.toThrow(new Error('Prisma error'));
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      prismaInstance.category.delete = jest.fn();
      const instance = new PrismaCategoryRepository(prismaInstance);

      await instance.delete(categoryMock.id);

      expect(prismaInstance.category.delete).toHaveBeenCalledWith({ where: { id: categoryMock.id } });
    });

    it('should throw an error when prisma throws', async () => {
      prismaInstance.category.delete = jest.fn().mockRejectedValueOnce(new Error('Prisma error'));
      const instance = new PrismaCategoryRepository(prismaInstance);

      await expect(instance.delete(categoryMock.id)).rejects.toThrow(new Error('Prisma error'));
    });
  });
});
