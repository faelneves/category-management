import { Request } from 'express';
import { categoryMock } from '../../../mocks/CategoryMock';
import HttpError from '../../../../src/domain/exceptions/HttpError';
import GetCategoryUseCaseMock from '../../../mocks/GetCategoryUseCaseMock';
import GetCategoryController from '../../../../src/application/v1/controller/GetCategoryController';

describe('DeleteCategoryController', () => {
  const categoryUseCaseMock = new GetCategoryUseCaseMock();

  it('should return 200 with the category', async () => {
    const instance = new GetCategoryController(categoryUseCaseMock);
    categoryUseCaseMock.handle = jest.fn().mockResolvedValueOnce(categoryMock);

    const req = {
      params: {
        id: categoryMock.id,
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

    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockJsonResponse).toHaveBeenCalledWith(categoryMock);
  });

  it('should return an error code when use case throws', async () => {
    const instance = new GetCategoryController(categoryUseCaseMock);
    categoryUseCaseMock.handle = jest.fn().mockRejectedValueOnce(new HttpError('not found', 404));

    const req = {
      params: {
        id: categoryMock.id,
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
