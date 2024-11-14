import { CreateCategoryUseCase } from '../../../usecases/CreateCategory/CreateCategoryUseCase';
import ICreateCategoryUseCase from '../../../usecases/CreateCategory/interfaces/ICreateCategoryUseCase';
import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import PrismaCategoryRepositoryFactory from '../prisma/respositories/PrismaCategoryRepositoryFactory';

export default class CreateCategoryUseCaseFactory {
  private static useCase: ICreateCategoryUseCase;

  static make(repository?: ICategoryRepository): ICreateCategoryUseCase {
    if (this.useCase) {
      return this.useCase;
    }

    this.useCase = new CreateCategoryUseCase(repository ?? PrismaCategoryRepositoryFactory.make());
    return this.useCase;
  }
}
