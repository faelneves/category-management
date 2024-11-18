import { Request, Response } from 'express';
import HttpError from '../../../domain/exceptions/HttpError';
import IListCategoryUseCase from '../../../usecases/ListCategory/interfaces/IListCategoryUseCase';
import { IListCategoryDTO } from '../../../domain/repositories/ICategoryRepository';

export default class ListCategoryController {
  constructor(private useCase: IListCategoryUseCase) {}

  public execute = async (request: Request, response: Response) => {
    try {
      const query = request.query || {};
      let filter: IListCategoryDTO = query;
      if (typeof filter?.active !== 'undefined') {
        filter = { ...filter, active: request.query.active === 'true' };
      }

      const categories = await this.useCase.handle(filter);

      response.status(200).json(categories);
    } catch (error: any | HttpError) {
      const httpCode = error instanceof HttpError ? error.code : 500;
      console.log('fail to list categories', error.message);
      response.status(httpCode).json({ error: error.message });
    }
  };
}
