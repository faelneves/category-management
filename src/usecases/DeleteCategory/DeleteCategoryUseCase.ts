import { ICategoryRepository } from 'src/domain/repositories/ICategoryRepository';
import IDeleteCategoryUseCase from './interfaces/IDeleteCategoryUseCase';

export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
  constructor(private repository: ICategoryRepository) {}

  async handle(categoryId: string): Promise<void> {
    return await this.repository.delete(categoryId);
  }
}
