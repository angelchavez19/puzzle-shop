import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { DeletedProductController } from './controllers/deleted-product.controller';
import { SearchProductController } from './controllers/search-product.controller';
import { CreateProductService } from './application/create.service';
import { FindAllProductsService } from './application/find-all.service';
import { FindBySlugProductsService } from './application/find-by-slug.service';
import { FindDeletedProductsService } from './application/find-deleted.service';
import { DeleteProductService } from './application/deleted.service';
import { UpdateProductService } from './application/update.service';
import { ProductSharedService } from './shared/product-shared.service';
import { RestoreProductService } from './application/restore.service';
import { CategorySharedService } from '../category/shared/category-shared.service';
import { ImagesSharedService } from '../images/shared/images-shared.service';

@Module({
  controllers: [
    DeletedProductController,
    ProductController,
    SearchProductController,
  ],
  providers: [
    CategorySharedService,
    CreateProductService,
    DeleteProductService,
    FindAllProductsService,
    FindBySlugProductsService,
    FindDeletedProductsService,
    ImagesSharedService,
    RestoreProductService,
    ProductSharedService,
    UpdateProductService,
  ],
})
export class ProductModule {}
