import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCategoryUseCase, FilterCategoriesUseCase } from './application';
import { CategoryRepository } from './domain';
import {
  Category,
  CategoryMongoRepository,
  CategorySchema,
  CreateCategoryControllerV1,
  FilterCategoryControllerV1,
} from './infrastructure';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CreateCategoryControllerV1, FilterCategoryControllerV1],
  providers: [
    CreateCategoryUseCase,
    FilterCategoriesUseCase,
    {
      provide: CategoryRepository,
      useClass: CategoryMongoRepository,
    },
  ],
  exports: [MongooseModule, CreateCategoryUseCase, FilterCategoriesUseCase],
})
export class CategoryModule {}
