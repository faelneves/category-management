import { IListCategoryDTO } from './../../../domain/repositories/ICategoryRepository';
import { ICategory } from '../../../domain/entities/ICategory';

export default interface IListCategoryUseCase {
  handle(filter: IListCategoryDTO): Promise<ICategory[]>;
}
