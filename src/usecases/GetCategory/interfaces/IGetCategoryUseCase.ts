import { ICategory } from '../../../domain/entities/ICategory';

export default interface IGetCategoryUseCase {
  handle(categoryId: string): Promise<ICategory>;
}
