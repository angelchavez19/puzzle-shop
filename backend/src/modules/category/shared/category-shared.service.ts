import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../entities/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategorySharedService {
  constructor(
    @InjectModel(Category.name)
    readonly categoryModel: Model<Category>,
  ) {}

  async getCategoryOrCreate(name: string) {
    const category = await this.categoryModel.findOne({ name });

    if (!category) return await this.categoryModel.create({ name });
    return category;
  }
}
