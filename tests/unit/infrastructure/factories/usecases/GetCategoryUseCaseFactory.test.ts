import GetCategoryUseCaseFactory from '../../../../../src/infrastructure/factories/usecases/GetCategoryUseCaseFactory';
import { GetCategoryUseCase } from '../../../../../src/usecases/GetCategory/GetCategoryUseCase';

describe('GetCategoryUseCaseFactory', () => {
  it('should make the get category use case', () => {
    const useCase = GetCategoryUseCaseFactory.make();

    expect(useCase).toBeInstanceOf(GetCategoryUseCase);
  });
});
