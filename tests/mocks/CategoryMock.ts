import { faker } from '@faker-js/faker';
import { ICategory } from './../../src/domain/entities/ICategory';

export const categoryMock: ICategory = {
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  hierarchyLevel: faker.number.int({ min: 1, max: 5 }),
  active: faker.datatype.boolean(),
  parentId: faker.string.uuid(),
};

export const parentCategoryMock: ICategory = {
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  hierarchyLevel: 1,
  active: faker.datatype.boolean(),
  parentId: faker.string.uuid(),
};
