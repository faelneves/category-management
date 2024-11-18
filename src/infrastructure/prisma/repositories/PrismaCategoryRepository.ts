import { ICategory } from '../../../domain/entities/ICategory';
import {
  ICategoryRepository,
  IListCategoryDTO,
  IUpdateCategoryDTO,
} from '../../../domain/repositories/ICategoryRepository';
import { PrismaClient } from '@prisma/client';
import HttpError from '../../../domain/exceptions/HttpError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaClient) {}

  async list(filter: IListCategoryDTO): Promise<ICategory[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        AND: [
          filter.name ? { name: { contains: filter.name, mode: 'insensitive' } } : {},
          filter.active !== undefined ? { active: filter.active } : {},
          filter.parentId !== undefined ? { parentId: filter.parentId } : {},
        ],
      },
    });

    return categories;
  }

  async update(categoryId: string, categoryDTO: IUpdateCategoryDTO): Promise<ICategory> {
    try {
      const updateCategory = await this.prisma.category.update({
        where: {
          id: categoryId,
        },
        data: categoryDTO,
      });

      return updateCategory;
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new HttpError('Category not found.', 404);
      } else {
        throw new HttpError(`Faild to update category: ${error.message}`, 500);
      }
    }
  }

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
    const deletedCategory = await this.prisma.category.delete({ where: { id } });
    if (deletedCategory == null) {
      throw new HttpError('Category not found.', 404);
    }
  }
}
