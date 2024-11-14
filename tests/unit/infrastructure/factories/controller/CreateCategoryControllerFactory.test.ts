import CreateCategoryController from '../../../../../src/application/v1/controller/CreateCategoryController';
import CreateCategoryControllerFactory from '../../../../../src/infrastructure/factories/controller/CreateCategoryControllerFactory';

describe('CreateCategoryControllerFactory', () => {
  it('should make the create category controller #unit', () => {
    const controller = CreateCategoryControllerFactory.make();

    expect(controller).toBeInstanceOf(CreateCategoryController);
  });
});
