import { Request, Response } from 'express';
import HttpError from '../../../domain/exceptions/HttpError';
import IGetCategoryUseCase from '../../../usecases/GetCategory/interfaces/IGetCategoryUseCase';

export default class GetCategoryController {
  constructor(private useCase: IGetCategoryUseCase) {}

  public execute = async (request: Request, response: Response) => {
    try {
      const categoryId = request.params.id;

      const category = await this.useCase.handle(categoryId);

      response.status(200).json(category);
    } catch (error: any | HttpError) {
      const httpCode = error instanceof HttpError ? error.code : 500;
      console.log('fail to get category', error.message);
      response.status(httpCode).json({ error: error.message });
    }
  };
}
