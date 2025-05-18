import { Injectable } from '@nestjs/common';
import { ProductSharedService } from '../shared/product-shared.service';

@Injectable()
export class FindDeletedProductsService {
  constructor(private readonly share: ProductSharedService) {}

  findDeleted() {
    return this.share.findAllDeleteProducts();
  }
}
