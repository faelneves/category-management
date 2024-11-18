import { ICategory } from '../../src/domain/entities/ICategory';
import { IUpdateCategoryDTO } from '../../src/domain/repositories/ICategoryRepository';
import IUpdateCategoryUseCase from '../../src/usecases/UpdateCategory/interfaces/IUpdateCategoryUseCase';

export default class UpdateCategoryUseCaseMock implements IUpdateCategoryUseCase {
  handle(_categoryId: string, _categoryDTO: IUpdateCategoryDTO): Promise<ICategory> {
    return Promise.resolve({} as ICategory);
  }
}
