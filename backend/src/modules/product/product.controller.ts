import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('deleted')
  getDeletedProducts() {
    return this.productService.getDeletedProducts();
  }

  @Get(':slug')
  getProductBySlug(@Param('slug') slug: string) {
    return this.productService.getProductBySlug(slug);
  }

  @Post()
  createNewProduct(@Body() data: CreateProductDTO) {
    return this.productService.createNewProduct(data);
  }

  @Patch(':id')
  updateProductById(@Param('id') id: string, @Body() data: UpdateProductDTO) {
    return this.productService.updateProductById(id, data);
  }

  @Patch(':id/restore')
  restoreADeletedProductById(@Param('id') id: string) {
    return this.productService.restoreADeletedProductById(id);
  }

  @Delete(':id')
  softDeleteProductById(@Param('id') id: string) {
    return this.productService.softDeleteProductById(id);
  }
}
