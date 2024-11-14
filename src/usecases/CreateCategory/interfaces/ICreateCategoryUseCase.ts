import { ICategory } from '../../../domain/entities/ICategory';
import ICreateCategoryDTO from './ICreateCategoryDTO';

export default interface ICreateCategoryUseCase {
  handle(category: ICreateCategoryDTO): Promise<ICategory>;
}
