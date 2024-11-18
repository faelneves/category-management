import { Request, Response } from 'express';
import HttpError from '../../../domain/exceptions/HttpError';
import IUpdateCategoryUseCase from '../../../usecases/UpdateCategory/interfaces/IUpdateCategoryUseCase';
import { IUpdateCategoryDTO } from '../../../domain/repositories/ICategoryRepository';

export default class UpdateCategoryController {
  constructor(private useCase: IUpdateCategoryUseCase) {}

  public execute = async (request: Request, response: Response) => {
    try {
      const categoryId = request.params.id;
      const updateCategoryDTO: IUpdateCategoryDTO = request.body;

      const category = await this.useCase.handle(categoryId, updateCategoryDTO);

      response.status(200).json(category);
    } catch (error: any | HttpError) {
      const httpCode = error instanceof HttpError ? error.code : 500;
      console.log('fail to update category', error.message);
      response.status(httpCode).json({ error: error.message });
    }
  };
}
