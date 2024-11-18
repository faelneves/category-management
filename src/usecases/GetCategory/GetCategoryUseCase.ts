import { ICategory } from '../../domain/entities/ICategory';
import IGetCategoryUseCase from './interfaces/IGetCategoryUseCase';
import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';

export class GetCategoryUseCase implements IGetCategoryUseCase {
  constructor(private repository: ICategoryRepository) {}

  async handle(categoryId: string): Promise<ICategory> {
    return this.repository.findById(categoryId);
  }
}
