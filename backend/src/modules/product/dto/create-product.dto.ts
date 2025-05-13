import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  IsArray,
  ArrayNotEmpty,
  IsDefined,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class DescriptionDTO {
  @IsString({ message: 'Long description must be a string' })
  @IsNotEmpty({ message: 'Long description should not be empty' })
  longDescription: string;

  // You can allow additional dynamic keys with string values if needed
  [key: string]: any;
}

export class CreateProductDTO {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsDefined({ message: 'Description is required' })
  @ValidateNested()
  @Type(() => DescriptionDTO)
  description: DescriptionDTO;

  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be greater than 0' })
  price: number;

  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock: number;

  @IsArray({ message: 'Tags must be an array' })
  @ArrayNotEmpty({ message: 'Tags cannot be empty' })
  @IsString({ each: true, message: 'Each tag must be a string' })
  tags: string[];

  @IsString({ message: 'Category must be a string' })
  @IsNotEmpty({ message: 'Category is required' })
  category: string;
}
