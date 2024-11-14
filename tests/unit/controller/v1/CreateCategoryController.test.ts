import { Request } from 'express';
import CreateCategoryUseCaseMock from '../../../mocks/CreateCategoryUseCaseMock';
import CreateCategoryController from '../../../../src/application/v1/controller/CreateCategoryController';
import { categoryMock } from '../../../mocks/CategoryMock';
import HttpError from '../../../../src/domain/exceptions/HttpError';

describe('CreateCategoryController', () => {
  const categoryUseCaseMock = new CreateCategoryUseCaseMock();

  it('should return 201 with the created category', async () => {
    const instance = new CreateCategoryController(categoryUseCaseMock);
    categoryUseCaseMock.handle = jest.fn().mockResolvedValueOnce(categoryMock);

    const req = {
      body: {
        name: categoryMock.name,
      },
      get: jest.fn(),
    } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    };

    await instance.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(mockJsonResponse).toHaveBeenCalledWith(categoryMock);
  });

  it('should return an error code when use case throws', async () => {
    const instance = new CreateCategoryController(categoryUseCaseMock);
    categoryUseCaseMock.handle = jest.fn().mockRejectedValueOnce(new HttpError('not found', 404));

    const req = {
      body: {
        name: categoryMock.name,
      },
      get: jest.fn(),
    } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    };

    await instance.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(mockJsonResponse).toHaveBeenCalledWith({ error: 'not found' });
  });
});
