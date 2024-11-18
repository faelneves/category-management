import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import PrismaCategoryRepositoryFactory from '../prisma/respositories/PrismaCategoryRepositoryFactory';
import IListCategoryUseCase from '../../../usecases/ListCategory/interfaces/IListCategoryUseCase';
import { ListCategoryUseCase } from '../../../usecases/ListCategory/ListCategoryUseCase';

export default class ListCategoryUseCaseFactory {
  private static useCase: IListCategoryUseCase;

  static make(repository?: ICategoryRepository): IListCategoryUseCase {
    if (this.useCase) {
      return this.useCase;
    }

    this.useCase = new ListCategoryUseCase(repository ?? PrismaCategoryRepositoryFactory.make());
    return this.useCase;
  }
}
