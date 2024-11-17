import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import PrismaCategoryRepositoryFactory from '../prisma/respositories/PrismaCategoryRepositoryFactory';
import IGetCategoryUseCase from '../../../usecases/GetCategory/interfaces/IGetCategoryUseCase';
import { GetCategoryUseCase } from '../../../usecases/GetCategory/GetCategoryUseCase';

export default class GetCategoryUseCaseFactory {
  private static useCase: IGetCategoryUseCase;

  static make(repository?: ICategoryRepository): IGetCategoryUseCase {
    if (this.useCase) {
      return this.useCase;
    }

    this.useCase = new GetCategoryUseCase(repository ?? PrismaCategoryRepositoryFactory.make());
    return this.useCase;
  }
}
