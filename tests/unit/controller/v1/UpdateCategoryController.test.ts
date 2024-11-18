import { Request } from 'express';
import { categoryMock } from '../../../mocks/CategoryMock';
import HttpError from '../../../../src/domain/exceptions/HttpError';
import UpdateCategoryUseCaseMock from '../../../mocks/UpdateCategoryUseCaseMock';
import UpdateCategoryController from '../../../../src/application/v1/controller/UpdateCategoryController';

describe('UpdateCategoryController', () => {
  const categoryUseCaseMock = new UpdateCategoryUseCaseMock();

  it('should return 200 with the updated category', async () => {
    const instance = new UpdateCategoryController(categoryUseCaseMock);
    categoryUseCaseMock.handle = jest.fn().mockResolvedValueOnce(categoryMock);

    const req = {
      params: {
        id: categoryMock.id,
      },
      body: {
        active: false,
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
    const instance = new UpdateCategoryController(categoryUseCaseMock);
    categoryUseCaseMock.handle = jest.fn().mockRejectedValueOnce(new HttpError('not found', 404));

    const req = {
      params: {
        id: categoryMock.id,
      },
      body: {
        active: false,
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
