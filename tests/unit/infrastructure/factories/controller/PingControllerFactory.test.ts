import PingControllerFactory from '../../../../../src/infrastructure/factories/controller/PingControllerFactory';
import PingController from '../../../../../src/application/v1/controller/PingController';

describe('PingControllerFactory', () => {
  it('should make the ping controller #unit', () => {
    const controller = PingControllerFactory.make();

    expect(controller).toBeInstanceOf(PingController);
  });
});
