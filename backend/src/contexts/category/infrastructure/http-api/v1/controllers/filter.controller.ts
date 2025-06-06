import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { API_ROUTE } from '../constants';
import { FilterCategoriesUseCase } from 'src/contexts/category/application';

@Controller(API_ROUTE)
export class FilterCategoryControllerV1 {
  constructor(private readonly filter: FilterCategoriesUseCase) {}

  @Get()
  run(
    @Query('query') query: string = '',
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 5,
  ) {
    return this.filter.execute(query, limit);
  }
}
