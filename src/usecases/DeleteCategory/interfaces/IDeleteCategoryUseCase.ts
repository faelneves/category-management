export default interface IDeleteCategoryUseCase {
  handle(categoryId: string): Promise<void>;
}
