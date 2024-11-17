import IGetCategoryUseCase from '../../../usecases/GetCategory/interfaces/IGetCategoryUseCase';
import GetCategoryController from '../../../application/v1/controller/GetCategoryController';
import GetCategoryUseCaseFactory from '../usecases/GetCategoryUseCaseFactory';

export default class GetCategoryControllerFactory {
  private static controller: GetCategoryController;

  static make(useCase?: IGetCategoryUseCase): GetCategoryController {
    if (this.controller) {
      return this.controller;
    }

    this.controller = new GetCategoryController(useCase ?? GetCategoryUseCaseFactory.make());
    return this.controller;
  }
}
