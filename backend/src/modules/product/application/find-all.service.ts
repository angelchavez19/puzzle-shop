import { Injectable } from '@nestjs/common';
import { ProductSharedService } from '../shared/product-shared.service';

@Injectable()
export class FindAllProductsService {
  constructor(private readonly share: ProductSharedService) {}

  findAll() {
    return this.share.findAllNotDeleteProducts();
  }
}
