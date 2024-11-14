import { ICategory } from '../../src/domain/entities/ICategory';
import { ICategoryRepository } from './../../src/domain/repositories/ICategoryRepository';

export default class CategoryRepositoryMock implements ICategoryRepository {
  create(category: ICategory): Promise<ICategory> {
    return Promise.resolve(category);
  }
  findById(_id: string): Promise<ICategory> {
    return Promise.resolve({} as ICategory);
  }
  findByParentId(_parentId: string): Promise<ICategory[]> {
    return Promise.resolve([]);
  }
  delete(_id: string): Promise<void> {
    return Promise.resolve();
  }
}
