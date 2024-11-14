import { faker } from '@faker-js/faker';
import HttpError from '../../../../src/domain/exceptions/HttpError';

describe('HttpError', () => {
  it('should create a new http error #unit', () => {
    const message = faker.lorem.words();
    const httpErrorInstance = new HttpError(message, 400);
    expect(httpErrorInstance.message).toEqual(message);
    expect(httpErrorInstance.code).toEqual(400);
  });
});
