import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductSharedService } from '../shared/product-shared.service';

@Injectable()
export class RestoreProductService {
  constructor(private readonly share: ProductSharedService) {}

  async restore(id: string) {
    let updated: any;

    try {
      updated = await this.share.productModel.findByIdAndUpdate(
        id,
        { $set: { isDelete: false } },
        { new: true },
      );
    } catch {
      throw new HttpException(
        'Failed to restore the product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!updated)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.share.findProductBySlug(updated.slug);
  }
}
