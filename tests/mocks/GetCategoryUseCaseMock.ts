import { ICategory } from '../../src/domain/entities/ICategory';
import IGetCategoryUseCase from '../../src/usecases/GetCategory/interfaces/IGetCategoryUseCase';

export default class GetCategoryUseCaseMock implements IGetCategoryUseCase {
  handle(_categoryId: string): Promise<ICategory> {
    return Promise.resolve({} as ICategory);
  }
}
