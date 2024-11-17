import { categoryMock } from '../../mocks/CategoryMock';
import { GetCategoryUseCase } from '../../../src/usecases/GetCategory/GetCategoryUseCase';
import CategoryRepositoryMock from '../../mocks/CategoryRepositoryMock';
import HttpError from '../../../src/domain/exceptions/HttpError';

describe('GetCategoryUseCase', () => {
  const categoryRepositoryMock = new CategoryRepositoryMock();

  it('should get a category', async () => {
    const categoryId = categoryMock.id;
    categoryRepositoryMock.findById = jest.fn().mockResolvedValueOnce(categoryMock);
    const useCaseInstance = new GetCategoryUseCase(categoryRepositoryMock);

    const category = await useCaseInstance.handle(categoryId);

    expect(category).toEqual(categoryMock);
  });

  it('should throw an error when repository throws', async () => {
    const categoryId = categoryMock.id;
    categoryRepositoryMock.findById = jest.fn().mockRejectedValueOnce(new HttpError('Prisma error', 500));
    const useCaseInstance = new GetCategoryUseCase(categoryRepositoryMock);

    await expect(useCaseInstance.handle(categoryId)).rejects.toThrow(new HttpError('Prisma error', 500));
  });
});
