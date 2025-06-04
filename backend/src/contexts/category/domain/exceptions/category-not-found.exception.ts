import { HttpException } from 'src/shared';

export class CategoryNotFound extends HttpException {
  constructor(id: string) {
    super(`Category with ID ${id} not found`, 404);
  }
}
