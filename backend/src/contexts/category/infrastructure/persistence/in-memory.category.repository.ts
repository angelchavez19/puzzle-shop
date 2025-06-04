import { Injectable } from 'src/shared';
import { CategoryEntity, CategoryRepository } from '../../domain';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model } from 'mongoose';

@Injectable()
export class InMemoryCategoryRepository implements CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async findByName(name: string): Promise<CategoryEntity | null> {
    const doc = await this.categoryModel
      .findOne({ name: { $regex: name, $options: 'i' } })
      .exec();
    if (!doc) return null;

    return new CategoryEntity({
      id: doc._id.toString(),
      name: doc.name,
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
    });
  }

  async filter(query: string, limit: number): Promise<CategoryEntity[]> {
    const categories = await this.categoryModel
      .find({
        name: { $regex: query, $options: 'i' },
      })
      .limit(limit)
      .exec();
    return categories.map(
      (doc) =>
        new CategoryEntity({
          id: doc._id.toString(),
          name: doc.name,
          createdAt: new Date(doc.createdAt),
          updatedAt: new Date(doc.updatedAt),
        }),
    );
  }

  async create(category: CategoryEntity): Promise<void> {
    await this.categoryModel.create({
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    });
  }
}
