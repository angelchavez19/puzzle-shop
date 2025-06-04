import { Injectable } from 'src/shared';
import { CategoryRepository } from '../domain/category.repository';
import { CategoryEntity } from '../domain/category.entity';

@Injectable()
export class FilterCategoriesUseCase {
  constructor(private readonly repo: CategoryRepository) {}

  execute(query: string, limit: number): Promise<CategoryEntity[]> {
    return this.repo.filter(query, limit);
  }
}
