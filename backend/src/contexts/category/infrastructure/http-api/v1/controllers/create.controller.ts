import { Body, Controller, Post } from '@nestjs/common';
import { API_ROUTE } from '../constants';
import { CreateCategoryUseCase } from 'src/contexts/category/application';
import { CreateCategoryDTO } from '../../dto/create-category.dto';

@Controller(API_ROUTE)
export class CreateCategoryControllerV1 {
  constructor(private readonly create: CreateCategoryUseCase) {}

  @Post()
  run(@Body() data: CreateCategoryDTO) {
    return this.create.execute(data);
  }
}
