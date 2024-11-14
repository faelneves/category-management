import { ICategory } from '../../../domain/entities/ICategory';
import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import { PrismaClient } from '@prisma/client';
import HttpError from '../../../domain/exceptions/HttpError';

export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaClient) {}

  async create(category: ICategory): Promise<ICategory> {
    const createdCategory = await this.prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
        hierarchyLevel: category.hierarchyLevel,
        active: category.active,
        parentId: category.parentId,
      },
    });

    return createdCategory;
  }

  async findById(id: string): Promise<ICategory> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (category == null) {
      throw new HttpError('Category not found.', 404);
    }
    return category;
  }

  async findByParentId(parentId: string): Promise<ICategory[]> {
    const categories = await this.prisma.category.findMany({ where: { parentId } });
    return categories;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
}
