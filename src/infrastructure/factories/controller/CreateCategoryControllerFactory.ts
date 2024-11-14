import CreateCategoryController from '../../../application/v1/controller/CreateCategoryController';
import ICreateCategoryUseCase from '../../../usecases/CreateCategory/interfaces/ICreateCategoryUseCase';
import CreateCategoryUseCaseFactory from '../usecases/CreateCategoryUseCaseFactory';

export default class CreateCategoryControllerFactory {
  private static controller: CreateCategoryController;

  static make(useCase?: ICreateCategoryUseCase): CreateCategoryController {
    if (this.controller) {
      return this.controller;
    }

    this.controller = new CreateCategoryController(useCase ?? CreateCategoryUseCaseFactory.make());
    return this.controller;
  }
}
