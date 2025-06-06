import { CategoryEntity } from './category.entity';

export abstract class CategoryRepository {
  abstract findByName(name: string): Promise<CategoryEntity | null>;
  abstract filter(query: string, limit: number): Promise<CategoryEntity[]>;

  abstract create(category: CategoryEntity): Promise<void>;
}
