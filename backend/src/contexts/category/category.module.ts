import { Module } from '@nestjs/common';
import {
  CreateCategoryControllerV1,
  FilterCategoryControllerV1,
} from './infrastructure/http-api/v1/controllers';
import { CreateCategoryUseCase, FilterCategoriesUseCase } from './application';
import { CategoryRepository } from './domain';
import { InMemoryCategoryRepository } from './infrastructure/persistence/in-memory.category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Category,
  CategorySchema,
} from './infrastructure/persistence/category.schema';

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
      useExisting: InMemoryCategoryRepository,
    },
    InMemoryCategoryRepository,
  ],
  exports: [MongooseModule, CreateCategoryUseCase, FilterCategoriesUseCase],
})
export class CategoryModule {}
