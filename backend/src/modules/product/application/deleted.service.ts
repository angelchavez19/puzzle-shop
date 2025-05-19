import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductSharedService } from '../shared/product-shared.service';

@Injectable()
export class DeleteProductService {
  constructor(private readonly share: ProductSharedService) {}

  async delete(id: string) {
    let updated;

    try {
      updated = await this.share.productModel.findByIdAndUpdate(
        id,
        { $set: { isDelete: true } },
        { new: true },
      );
    } catch {
      throw new HttpException(
        'Failed to delete product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!updated)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }
}
