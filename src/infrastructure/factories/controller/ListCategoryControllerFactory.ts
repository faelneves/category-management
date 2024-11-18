import ListCategoryController from '../../../application/v1/controller/ListCategoryController';
import IListCategoryUseCase from '../../../usecases/ListCategory/interfaces/IListCategoryUseCase';
import ListCategoryUseCaseFactory from '../usecases/ListCategoryUseCaseFactory';

export default class ListCategoryControllerFactory {
  private static controller: ListCategoryController;

  static make(useCase?: IListCategoryUseCase): ListCategoryController {
    if (this.controller) {
      return this.controller;
    }

    this.controller = new ListCategoryController(useCase ?? ListCategoryUseCaseFactory.make());
    return this.controller;
  }
}
