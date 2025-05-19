import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { ProductSharedService } from '../shared/product-shared.service';
import { CategorySharedService } from 'src/modules/category/shared/category-shared.service';
import { AnyKeys } from 'mongoose';
import { Product } from '../entities/product.schema';

@Injectable()
export class UpdateProductService {
  constructor(
    private readonly share: ProductSharedService,
    private readonly categoryService: CategorySharedService,
  ) {}

  async update(id: string, data: UpdateProductDTO) {
    if (!data)
      throw new HttpException('Data is required', HttpStatus.BAD_REQUEST);

    const updateData: AnyKeys<Product> = { ...data, updatedAt: Date.now() };

    try {
      if (data.name) updateData.slug = this.share.generateSlug(data.name);
      if (data.category)
        updateData.category = (
          await this.categoryService.getCategoryOrCreate(data.category)
        )._id;
    } catch {
      throw new HttpException(
        'Failed to update product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    let updated: any;

    try {
      updated = await this.share.productModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true },
      );
    } catch {
      throw new HttpException(
        'Failed to update product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!updated)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return updated as object;
  }
}
