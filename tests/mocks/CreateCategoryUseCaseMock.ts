import { ICategory } from '../../src/domain/entities/ICategory';
import ICreateCategoryDTO from '../../src/usecases/CreateCategory/interfaces/ICreateCategoryDTO';
import ICreateCategoryUseCase from '../../src/usecases/CreateCategory/interfaces/ICreateCategoryUseCase';

export default class CreateCategoryUseCaseMock implements ICreateCategoryUseCase {
  handle(_category: ICreateCategoryDTO): Promise<ICategory> {
    return Promise.resolve({} as ICategory);
  }
}
