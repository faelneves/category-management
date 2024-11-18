import IUpdateCategoryUseCase from '../../../usecases/UpdateCategory/interfaces/IUpdateCategoryUseCase';
import UpdateCategoryController from '../../../application/v1/controller/UpdateCategoryController';
import UpdateCategoryUseCaseFactory from '../usecases/UpdateCategoryUseCaseFactory';

export default class UpdateCategoryControllerFactory {
  private static controller: UpdateCategoryController;

  static make(useCase?: IUpdateCategoryUseCase): UpdateCategoryController {
    if (this.controller) {
      return this.controller;
    }

    this.controller = new UpdateCategoryController(useCase ?? UpdateCategoryUseCaseFactory.make());
    return this.controller;
  }
}
