import { faker } from '@faker-js/faker';
import { ICategory } from './../../src/domain/entities/ICategory';

export const CategoryMock: ICategory = {
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  hierarchyLevel: faker.number.int({ min: 1, max: 5 }),
  active: faker.datatype.boolean(),
  parentId: faker.string.uuid(),
};