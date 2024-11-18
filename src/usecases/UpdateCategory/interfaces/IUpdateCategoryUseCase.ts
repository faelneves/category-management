import { IUpdateCategoryDTO } from 'src/domain/repositories/ICategoryRepository';
import { ICategory } from '../../../domain/entities/ICategory';

export default interface ICreateCategoryUseCase {
  handle(categoryId: string, category: IUpdateCategoryDTO): Promise<ICategory>;
}
