import HttpError from '../../domain/exceptions/HttpError';
import { ICategory } from '../../domain/entities/ICategory';
import { ICategoryRepository, IUpdateCategoryDTO } from '../../domain/repositories/ICategoryRepository';
import IUpdateCategoryUseCase from './interfaces/IUpdateCategoryUseCase';

export class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
  constructor(private repository: ICategoryRepository) {}

  async handle(categoryId: string, categoryDTO: IUpdateCategoryDTO): Promise<ICategory> {
    const category = await this.repository.findById(categoryId);

    if (categoryDTO.name && category.parentId) {
      const brothers = await this.repository.findByParentId(category.parentId);
      for (const brother of brothers) {
        if (brother.name === categoryDTO.name) {
          throw new HttpError('Category with this name already exists under the same parent.', 409);
        }
      }
    }

    return this.repository.update(categoryId, categoryDTO);
  }
}
