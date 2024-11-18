import ListCategoryController from '../../../../src/application/v1/controller/ListCategoryController';
import { Request } from 'express';
import { categoryMock } from '../../../mocks/CategoryMock';
import HttpError from '../../../../src/domain/exceptions/HttpError';
import ListCategoryUseCaseMock from '../../../mocks/ListCategoryUseCaseMock';

describe('ListCategoryController', () => {
  const categoryUseCaseMock = new ListCategoryUseCaseMock();

  it('should return 200 with a list of categories', async () => {
    const instance = new ListCategoryController(categoryUseCaseMock);
    categoryUseCaseMock.handle = jest.fn().mockResolvedValueOnce([categoryMock]);

    const req = {
      query: {
        active: 'true',
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
    expect(mockJsonResponse).toHaveBeenCalledWith([categoryMock]);
  });

  it('should return an error code when use case throws', async () => {
    const instance = new ListCategoryController(categoryUseCaseMock);
    categoryUseCaseMock.handle = jest.fn().mockRejectedValueOnce(new HttpError('internal error', 500));

    const req = {
      query: {
        active: 'true',
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

    expect(res.status).toHaveBeenCalledWith(500);
    expect(mockJsonResponse).toHaveBeenCalledWith({ error: 'internal error' });
  });
});
