import { categoryMock, parentCategoryMock } from '../../mocks/CategoryMock';
import CategoryRepositoryMock from '../../mocks/CategoryRepositoryMock';
import HttpError from '../../../src/domain/exceptions/HttpError';
import { UpdateCategoryUseCase } from '../../../src/usecases/UpdateCategory/UpdateCategoryUseCase';

describe('UpdateCategoryUseCase', () => {
  const categoryRepositoryMock = new CategoryRepositoryMock();

  it('should update a parent category', async () => {
    const categoryId = parentCategoryMock.id;
    categoryRepositoryMock.findById = jest.fn().mockResolvedValueOnce(parentCategoryMock);
    categoryRepositoryMock.update = jest.fn().mockResolvedValueOnce(parentCategoryMock);
    const useCaseInstance = new UpdateCategoryUseCase(categoryRepositoryMock);

    const category = await useCaseInstance.handle(categoryId, { active: false });

    expect(category).toEqual(parentCategoryMock);
  });

  it('should throw an error when repository throws', async () => {
    const categoryId = categoryMock.id;
    categoryRepositoryMock.findById = jest.fn().mockRejectedValueOnce(new HttpError('Prisma error', 500));
    const useCaseInstance = new UpdateCategoryUseCase(categoryRepositoryMock);

    await expect(useCaseInstance.handle(categoryId, { active: false })).rejects.toThrow(
      new HttpError('Prisma error', 500),
    );
  });
});
