import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategorySharedService } from 'src/modules/category/shared/category-shared.service';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductSharedService } from '../shared/product-shared.service';

@Injectable()
export class CreateProductService {
  constructor(
    private readonly share: ProductSharedService,
    private readonly categoryService: CategorySharedService,
  ) {}

  async create(data: CreateProductDTO) {
    try {
      const slug = this.share.generateSlug(data.name);

      const category = await this.categoryService.getCategoryOrCreate(
        data.category,
      );

      // Handle images

      return this.share.productModel.create({
        ...data,
        slug,
        ratingAvg: 0,
        category: category._id,
      });
    } catch {
      throw new HttpException(
        'Failed to create product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
