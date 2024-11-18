import DeleteCategoryController from '../../../../../src/application/v1/controller/DeleteCategoryController';
import DeleteCategoryControllerFactory from '../../../../../src/infrastructure/factories/controller/DeleteCategoryControllerFactory';

describe('DeleteCategoryControllerFactory', () => {
  it('should make the delete category controller #unit', () => {
    const controller = DeleteCategoryControllerFactory.make();

    expect(controller).toBeInstanceOf(DeleteCategoryController);
  });
});
