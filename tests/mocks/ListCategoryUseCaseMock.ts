import { ICategory } from '../../src/domain/entities/ICategory';
import { IListCategoryDTO } from '../../src/domain/repositories/ICategoryRepository';
import IListCategoryUseCase from '../../src/usecases/ListCategory/interfaces/IListCategoryUseCase';

export default class ListCategoryUseCaseMock implements IListCategoryUseCase {
  handle(_filter: IListCategoryDTO): Promise<ICategory[]> {
    return Promise.resolve([]);
  }
}
