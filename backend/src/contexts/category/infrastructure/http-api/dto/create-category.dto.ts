import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCategoryDTO {
  @IsString({ message: 'Category name must be a string' })
  @IsNotEmpty({ message: 'Category name should not be empty' })
  @Length(3, 50, {
    message: 'Category name must be between 3 and 50 characters',
  })
  name: string;
}
