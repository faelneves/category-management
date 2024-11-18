import { Request, Response } from 'express';
import HttpError from '../../../domain/exceptions/HttpError';
import IDeleteCategoryUseCase from '../../../usecases/DeleteCategory/interfaces/IDeleteCategoryUseCase';

export default class DeleteCategoryController {
  constructor(private useCase: IDeleteCategoryUseCase) {}

  public execute = async (request: Request, response: Response) => {
    try {
      const categoryId = request.params.id;

      await this.useCase.handle(categoryId);

      response.status(204).send();
    } catch (error: any | HttpError) {
      const httpCode = error instanceof HttpError ? error.code : 500;
      console.log('fail to delete category', error.message);
      response.status(httpCode).json({ error: error.message });
    }
  };
}
