import { ICategory } from '../entities/ICategory';

export interface IUpdateCategoryDTO {
  name?: string;
  active?: boolean;
}

export interface IListCategoryDTO {
  name?: string;
  active?: boolean;
  parentId?: string | null;
}

export interface ICategoryRepository {
  create(category: ICategory): Promise<ICategory>;
  findById(id: string): Promise<ICategory>;
  findByParentId(parentId: string): Promise<ICategory[]>;
  list(filter: IListCategoryDTO): Promise<ICategory[]>;
  delete(id: string): Promise<void>;
  update(categoryId: string, category: IUpdateCategoryDTO): Promise<ICategory>;
}
