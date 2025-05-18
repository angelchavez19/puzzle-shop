import { Injectable } from '@nestjs/common';
import { ProductSharedService } from '../shared/product-shared.service';

@Injectable()
export class FindBySlugProductsService {
  constructor(private readonly share: ProductSharedService) {}

  findBySlug(slug: string) {
    return this.share.findProductBySlug(slug);
  }
}
