import { PrismaClient } from '@prisma/client';
import { ICategoryRepository } from '../../../../domain/repositories/ICategoryRepository';
import { PrismaCategoryRepository } from '../../../../infrastructure/prisma/repositories/PrismaCategoryRepository';
import prismaInstance from '../../../../infrastructure/prisma/PrismaClient';

export default class PrismaCategoryRepositoryFactory {
  private static repository: ICategoryRepository;

  static make(prisma?: PrismaClient): ICategoryRepository {
    if (this.repository) {
      return this.repository;
    }
    this.repository = new PrismaCategoryRepository(prisma || prismaInstance);
    return this.repository;
  }
}
