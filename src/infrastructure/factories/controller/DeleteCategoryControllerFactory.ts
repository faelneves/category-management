import DeleteCategoryController from '../../../application/v1/controller/DeleteCategoryController';
import IDeleteCategoryUseCase from '../../../usecases/DeleteCategory/interfaces/IDeleteCategoryUseCase';
import DeleteCategoryUseCaseFactory from '../usecases/DeleteCategoryUseCaseFactory';

export default class DeleteCategoryControllerFactory {
  private static controller: DeleteCategoryController;

  static make(useCase?: IDeleteCategoryUseCase): DeleteCategoryController {
    if (this.controller) {
      return this.controller;
    }

    this.controller = new DeleteCategoryController(useCase ?? DeleteCategoryUseCaseFactory.make());
    return this.controller;
  }
}
