import { categoryMock } from '../../mocks/CategoryMock';
import { DeleteCategoryUseCase } from '../../../src/usecases/DeleteCategory/DeleteCategoryUseCase';
import CategoryRepositoryMock from '../../mocks/CategoryRepositoryMock';
import HttpError from '../../../src/domain/exceptions/HttpError';

describe('DeleteCategoryUseCase', () => {
  const categoryRepositoryMock = new CategoryRepositoryMock();

  it('should delete a category', async () => {
    const categoryId = categoryMock.id;
    categoryRepositoryMock.delete = jest.fn();
    const useCaseInstance = new DeleteCategoryUseCase(categoryRepositoryMock);

    await useCaseInstance.handle(categoryId);

    expect(categoryRepositoryMock.delete).toHaveBeenCalledWith(categoryId);
  });

  it('should throw an error when repository throws', async () => {
    const categoryId = categoryMock.id;
    categoryRepositoryMock.delete = jest.fn().mockRejectedValueOnce(new HttpError('Prisma error', 500));
    const useCaseInstance = new DeleteCategoryUseCase(categoryRepositoryMock);

    await expect(useCaseInstance.handle(categoryId)).rejects.toThrow(new HttpError('Prisma error', 500));
  });
});
