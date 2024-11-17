import GetCategoryController from '../../../../../src/application/v1/controller/GetCategoryController';
import GetCategoryControllerFactory from '../../../../../src/infrastructure/factories/controller/GetCategoryControllerFactory';

describe('GetCategoryControllerFactory', () => {
  it('should make the get category controller #unit', () => {
    const controller = GetCategoryControllerFactory.make();

    expect(controller).toBeInstanceOf(GetCategoryController);
  });
});
