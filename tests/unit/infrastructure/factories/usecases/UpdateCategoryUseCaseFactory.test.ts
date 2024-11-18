import UpdateCategoryUseCaseFactory from '../../../../../src/infrastructure/factories/usecases/UpdateCategoryUseCaseFactory';
import { UpdateCategoryUseCase } from '../../../../../src/usecases/UpdateCategory/UpdateCategoryUseCase';

describe('UpdateCategoryUseCaseFactory', () => {
  it('should make the update category use case', () => {
    const useCase = UpdateCategoryUseCaseFactory.make();

    expect(useCase).toBeInstanceOf(UpdateCategoryUseCase);
  });
});
