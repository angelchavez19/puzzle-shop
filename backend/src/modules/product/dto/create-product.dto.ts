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

  [key: string]: any;
}

class ImageDTO {
  @IsString({ message: 'Public Id must be a string' })
  @IsNotEmpty({ message: 'Public Id should not be empty' })
  publicId: string;

  @IsString({ message: 'Alt must be a string' })
  @IsNotEmpty({ message: 'Alt should not be empty' })
  alt: string;
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

  @IsArray({ message: 'Images must be an array' })
  @ArrayNotEmpty({ message: 'Images cannot be empty' })
  @ValidateNested({ each: true })
  @Type(() => ImageDTO)
  images: ImageDTO[];

  @IsArray({ message: 'Tags must be an array' })
  @ArrayNotEmpty({ message: 'Tags cannot be empty' })
  @IsString({ each: true, message: 'Each tag must be a string' })
  tags: string[];

  @IsString({ message: 'Category must be a string' })
  @IsNotEmpty({ message: 'Category is required' })
  category: string;
}
