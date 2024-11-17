import { Request, Response } from 'express';
import ICreateCategoryDTO from '../../../usecases/CreateCategory/interfaces/ICreateCategoryDTO';
import ICreateCategoryUseCase from '../../../usecases/CreateCategory/interfaces/ICreateCategoryUseCase';
import HttpError from '../../../domain/exceptions/HttpError';

export default class CreateCategoryController {
  constructor(private useCase: ICreateCategoryUseCase) {}

  public execute = async (request: Request, response: Response) => {
    try {
      const createCategoryDTO: ICreateCategoryDTO = request.body;

      const category = await this.useCase.handle(createCategoryDTO);

      response.status(201).json(category);
    } catch (error: any | HttpError) {
      const httpCode = error instanceof HttpError ? error.code : 500;
      console.log('fail to create category', error.message);
      response.status(httpCode).json({ error: error.message });
    }
  };
}
