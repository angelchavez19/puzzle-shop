import { Controller, Get, Param } from '@nestjs/common';
import { FindAllProductsService } from '../application/find-all.service';
import { FindBySlugProductsService } from '../application/find-by-slug.service';
import { FindDeletedProductsService } from '../application/find-deleted.service';

@Controller('products')
export class SearchProductController {
  constructor(
    private readonly findAllService: FindAllProductsService,
    private readonly findBySlugService: FindBySlugProductsService,
    private readonly findDeleteProductsService: FindDeletedProductsService,
  ) {}
  @Get()
  findAll() {
    return this.findAllService.findAll();
  }

  @Get('by-slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.findBySlugService.findBySlug(slug);
  }

  @Get('deleted')
  findDeleted() {
    return this.findDeleteProductsService.findDeleted();
  }
}
