import ListCategoryController from '../../../../../src/application/v1/controller/ListCategoryController';
import ListCategoryControllerFactory from '../../../../../src/infrastructure/factories/controller/ListCategoryControllerFactory';

describe('ListCategoryControllerFactory', () => {
  it('should make the list category controller #unit', () => {
    const controller = ListCategoryControllerFactory.make();

    expect(controller).toBeInstanceOf(ListCategoryController);
  });
});
