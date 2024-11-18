import { ICategory } from '../../domain/entities/ICategory';
import { ICategoryRepository, IListCategoryDTO } from '../../domain/repositories/ICategoryRepository';
import IListCategoryUseCase from './interfaces/IListCategoryUseCase';

export class ListCategoryUseCase implements IListCategoryUseCase {
  constructor(private repository: ICategoryRepository) {}

  async handle(filter: IListCategoryDTO): Promise<ICategory[]> {
    return this.repository.list(filter);
  }
}
