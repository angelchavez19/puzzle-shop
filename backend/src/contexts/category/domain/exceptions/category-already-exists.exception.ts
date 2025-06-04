import { HttpException } from 'src/shared';

export class CategoryAlreadyExistsException extends HttpException {
  constructor(name: string) {
    super(`Category '${name}' already exists.`, 409);
  }
}
