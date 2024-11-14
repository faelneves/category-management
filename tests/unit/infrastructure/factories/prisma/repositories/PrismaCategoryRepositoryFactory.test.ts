import PrismaCategoryRepositoryFactory from '../../../../../../src/infrastructure/factories/prisma/respositories/PrismaCategoryRepositoryFactory';
import { PrismaCategoryRepository } from '../../../../../../src/infrastructure/prisma/repositories/PrismaCategoryRepository';

describe('PrismaCategoryRepositoryFactory', () => {
  it('should make the ping controller', () => {
    const repository = PrismaCategoryRepositoryFactory.make();

    expect(repository).toBeInstanceOf(PrismaCategoryRepository);
  });
});
