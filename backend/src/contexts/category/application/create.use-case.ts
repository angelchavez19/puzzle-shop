import { Injectable } from 'src/shared';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryEntity, CategoryRepository } from '../domain';
import { CategoryAlreadyExistsException } from '../domain/exceptions/category-already-exists.exception';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly repo: CategoryRepository) {}

  async execute(category: CreateCategoryDTO) {
    const categoryFounded = await this.repo.findByName(category.name);

    if (categoryFounded)
      throw new CategoryAlreadyExistsException(category.name);

    const newCategory = CategoryEntity.create(category);
    await this.repo.create(newCategory);
  }
}
