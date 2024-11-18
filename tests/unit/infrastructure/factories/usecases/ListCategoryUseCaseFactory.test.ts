import ListCategoryUseCaseFactory from '../../../../../src/infrastructure/factories/usecases/ListCategoryUseCaseFactory';
import { ListCategoryUseCase } from '../../../../../src/usecases/ListCategory/ListCategoryUseCase';

describe('ListCategoryUseCaseFactory', () => {
  it('should make the list category use case', () => {
    const useCase = ListCategoryUseCaseFactory.make();

    expect(useCase).toBeInstanceOf(ListCategoryUseCase);
  });
});
