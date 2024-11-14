import { categoryMock, parentCategoryMock } from './../../mocks/CategoryMock';
import { CreateCategoryUseCase } from './../../../src/usecases/CreateCategory/CreateCategoryUseCase';
import CategoryRepositoryMock from '../../mocks/CategoryRepositoryMock';
import { faker } from '@faker-js/faker';
import HttpError from '../../../src/domain/exceptions/HttpError';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '123e4567-e89b-12d3-a456-426614174000'),
}));

describe('CreateCategoryUseCase', () => {
  const categoryRepositoryMock = new CategoryRepositoryMock();

  it('should create a category without parent', async () => {
    const categoryDTO = {
      name: parentCategoryMock.name,
      active: parentCategoryMock.active,
    };
    categoryRepositoryMock.create = jest.fn().mockResolvedValueOnce(parentCategoryMock);
    const useCaseInstance = new CreateCategoryUseCase(categoryRepositoryMock);

    const createdCategory = await useCaseInstance.handle(categoryDTO);

    expect(createdCategory).toEqual(parentCategoryMock);
    expect(categoryRepositoryMock.create).toHaveBeenCalledWith({
      id: '123e4567-e89b-12d3-a456-426614174000',
      hierarchyLevel: 1,
      ...categoryDTO,
    });
  });

  it('should throw an error when a parent hierarchy level is 5', async () => {
    const categoryDTO = {
      name: categoryMock.name,
      active: categoryMock.active,
      parentId: faker.string.uuid(),
    };
    categoryRepositoryMock.findById = jest.fn().mockResolvedValueOnce({ ...categoryMock, hierarchyLevel: 5 });
    const useCaseInstance = new CreateCategoryUseCase(categoryRepositoryMock);

    await expect(useCaseInstance.handle(categoryDTO)).rejects.toThrow(
      new HttpError('Maximum hierarchy depth of 5 levels exceeded.', 400),
    );
  });

  it('should throw an error when parent have 20 childrens', async () => {
    const categoryDTO = {
      name: categoryMock.name,
      active: categoryMock.active,
      parentId: faker.string.uuid(),
    };

    categoryRepositoryMock.findById = jest.fn().mockResolvedValueOnce(parentCategoryMock);
    categoryRepositoryMock.findByParentId = jest
      .fn()
      .mockResolvedValueOnce(Array.from({ length: 20 }, () => categoryMock));
    const useCaseInstance = new CreateCategoryUseCase(categoryRepositoryMock);

    await expect(useCaseInstance.handle(categoryDTO)).rejects.toThrow(
      new HttpError('A category can not have more than 20 children.', 400),
    );
  });

  it('should throw an error when parent have a child with the same name', async () => {
    const categoryDTO = {
      name: categoryMock.name,
      active: categoryMock.active,
      parentId: faker.string.uuid(),
    };

    categoryRepositoryMock.findById = jest.fn().mockResolvedValueOnce(parentCategoryMock);
    categoryRepositoryMock.findByParentId = jest.fn().mockResolvedValueOnce([categoryMock]);
    const useCaseInstance = new CreateCategoryUseCase(categoryRepositoryMock);

    await expect(useCaseInstance.handle(categoryDTO)).rejects.toThrow(
      new HttpError('Category with this name already exists under the same parent.', 400),
    );
  });

  it('should create a category with parent', async () => {
    const categoryDTO = {
      name: categoryMock.name,
      active: categoryMock.active,
      parentId: faker.string.uuid(),
    };
    categoryRepositoryMock.findById = jest.fn().mockResolvedValueOnce(parentCategoryMock);
    categoryRepositoryMock.findByParentId = jest.fn().mockResolvedValueOnce([]);
    categoryRepositoryMock.create = jest.fn().mockResolvedValueOnce(categoryMock);
    const useCaseInstance = new CreateCategoryUseCase(categoryRepositoryMock);

    const createdCategory = await useCaseInstance.handle(categoryDTO);

    expect(createdCategory).toEqual(categoryMock);
    expect(categoryRepositoryMock.create).toHaveBeenCalledWith({
      id: '123e4567-e89b-12d3-a456-426614174000',
      hierarchyLevel: parentCategoryMock.hierarchyLevel + 1,
      ...categoryDTO,
    });
  });
});
