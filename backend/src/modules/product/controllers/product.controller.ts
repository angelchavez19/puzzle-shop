import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDTO } from '../dto/create-product.dto';
import { CreateProductService } from '../application/create.service';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { UpdateProductService } from '../application/update.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createService: CreateProductService,
    private readonly updateService: UpdateProductService,
  ) {}

  @Post()
  create(@Body() data: CreateProductDTO) {
    return this.createService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDTO) {
    return this.updateService.update(id, data);
  }
}
