import IDeleteCategoryUseCase from '../../src/usecases/DeleteCategory/interfaces/IDeleteCategoryUseCase';

export default class DeleteCategoryUseCaseMock implements IDeleteCategoryUseCase {
  handle(_categoryId: string): Promise<void> {
    return Promise.resolve();
  }
}
