import DeleteCategoryUseCaseFactory from '../../../../../src/infrastructure/factories/usecases/DeleteCategoryUseCaseFactory';
import { DeleteCategoryUseCase } from '../../../../../src/usecases/DeleteCategory/DeleteCategoryUseCase';

describe('DeleteCategoryUseCaseFactory', () => {
  it('should make the delete category use case', () => {
    const useCase = DeleteCategoryUseCaseFactory.make();

    expect(useCase).toBeInstanceOf(DeleteCategoryUseCase);
  });
});
