import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import PrismaCategoryRepositoryFactory from '../prisma/respositories/PrismaCategoryRepositoryFactory';
import IDeleteCategoryUseCase from '../../../usecases/DeleteCategory/interfaces/IDeleteCategoryUseCase';
import { DeleteCategoryUseCase } from '../../../usecases/DeleteCategory/DeleteCategoryUseCase';

export default class DeleteCategoryUseCaseFactory {
  private static useCase: IDeleteCategoryUseCase;

  static make(repository?: ICategoryRepository): IDeleteCategoryUseCase {
    if (this.useCase) {
      return this.useCase;
    }

    this.useCase = new DeleteCategoryUseCase(repository ?? PrismaCategoryRepositoryFactory.make());
    return this.useCase;
  }
}
