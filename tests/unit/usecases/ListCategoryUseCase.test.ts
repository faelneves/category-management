import { categoryMock } from '../../mocks/CategoryMock';
import { ListCategoryUseCase } from '../../../src/usecases/ListCategory/ListCategoryUseCase';
import CategoryRepositoryMock from '../../mocks/CategoryRepositoryMock';
import HttpError from '../../../src/domain/exceptions/HttpError';

describe('ListCategoryUseCase', () => {
  const categoryRepositoryMock = new CategoryRepositoryMock();

  it('should list a batch of categories', async () => {
    categoryRepositoryMock.list = jest.fn().mockResolvedValueOnce([categoryMock]);
    const useCaseInstance = new ListCategoryUseCase(categoryRepositoryMock);

    const categories = await useCaseInstance.handle({ active: true });

    expect(categories).toEqual([categoryMock]);
  });

  it('should throw an error when repository throws', async () => {
    categoryRepositoryMock.list = jest.fn().mockRejectedValueOnce(new HttpError('Prisma error', 500));
    const useCaseInstance = new ListCategoryUseCase(categoryRepositoryMock);

    await expect(useCaseInstance.handle({})).rejects.toThrow(new HttpError('Prisma error', 500));
  });
});
