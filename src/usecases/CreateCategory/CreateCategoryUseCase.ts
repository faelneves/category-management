import { ICategory } from '../../domain/entities/ICategory';
import ICreateCategoryUseCase from './interfaces/ICreateCategoryUseCase';
import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';
import ICreateCategoryDTO from './interfaces/ICreateCategoryDTO';
import { v4 as uuidv4 } from 'uuid';
import HttpError from '../../domain/exceptions/HttpError';

export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(private repository: ICategoryRepository) {}

  async handle(categoryDTO: ICreateCategoryDTO): Promise<ICategory> {
    const id = uuidv4();

    if (!categoryDTO.parentId) {
      return await this.repository.create({
        id,
        hierarchyLevel: 1,
        ...categoryDTO,
      });
    }

    const parentPromise = this.repository.findById(categoryDTO.parentId);
    const brothersPromise = this.repository.findByParentId(categoryDTO.parentId);
    const [parent, brothers] = await Promise.all([parentPromise, brothersPromise]);

    if (parent?.hierarchyLevel >= 5) {
      throw new HttpError('Maximum hierarchy depth of 5 levels exceeded.', 400);
    }

    if (brothers.length >= 20) {
      throw new HttpError('A category can not have more than 20 children.', 400);
    }

    for (const brother of brothers) {
      if (brother.name === categoryDTO.name) {
        throw new HttpError('Category with this name already exists under the same parent.', 409);
      }
    }

    return await this.repository.create({
      id,
      hierarchyLevel: parent.hierarchyLevel + 1,
      ...categoryDTO,
    });
  }
}
