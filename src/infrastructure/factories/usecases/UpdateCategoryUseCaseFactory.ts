import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import PrismaCategoryRepositoryFactory from '../prisma/respositories/PrismaCategoryRepositoryFactory';
import IUpdateCategoryUseCase from '../../../usecases/UpdateCategory/interfaces/IUpdateCategoryUseCase';
import { UpdateCategoryUseCase } from '../../../usecases/UpdateCategory/UpdateCategoryUseCase';

export default class UpdateCategoryUseCaseFactory {
  private static useCase: IUpdateCategoryUseCase;

  static make(repository?: ICategoryRepository): IUpdateCategoryUseCase {
    if (this.useCase) {
      return this.useCase;
    }

    this.useCase = new UpdateCategoryUseCase(repository ?? PrismaCategoryRepositoryFactory.make());
    return this.useCase;
  }
}
