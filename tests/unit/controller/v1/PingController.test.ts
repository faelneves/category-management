import { Request } from 'express';
import PingController from '../../../../src/application/v1/controller/PingController';

describe('PingController', () => {
  it('should handle the request #unit', async () => {
    const instance = new PingController();
    const req = { get: jest.fn() } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    };

    instance.execute(req, res);
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockJsonResponse).toHaveBeenCalled();
  });

  it('should match the snapshot #unit', () => {
    const instance = new PingController();
    expect(instance).toMatchSnapshot();
  });
});
