import UpdateCategoryController from '../../../../../src/application/v1/controller/UpdateCategoryController';
import UpdateCategoryControllerFactory from '../../../../../src/infrastructure/factories/controller/UpdateCategoryControllerFactory';

describe('UpdateCategoryControllerFactory', () => {
  it('should make the update category controller #unit', () => {
    const controller = UpdateCategoryControllerFactory.make();

    expect(controller).toBeInstanceOf(UpdateCategoryController);
  });
});
