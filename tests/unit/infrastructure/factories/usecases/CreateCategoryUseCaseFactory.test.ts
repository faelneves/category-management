import CreateCategoryUseCaseFactory from '../../../../../src/infrastructure/factories/usecases/CreateCategoryUseCaseFactory';
import { CreateCategoryUseCase } from '../../../../../src/usecases/CreateCategory/CreateCategoryUseCase';

describe('CreateCategoryUseCaseFactory', () => {
  it('should make the create category use case', () => {
    const useCase = CreateCategoryUseCaseFactory.make();

    expect(useCase).toBeInstanceOf(CreateCategoryUseCase);
  });
});
