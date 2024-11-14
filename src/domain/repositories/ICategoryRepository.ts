import { ICategory } from '../entities/ICategory';

export interface ICategoryRepository {
  create(category: ICategory): Promise<ICategory>;
  findById(id: string): Promise<ICategory>;
  findByParentId(parentId: string): Promise<ICategory[]>;
  delete(id: string): Promise<void>;
}
