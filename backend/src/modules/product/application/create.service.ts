import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategorySharedService } from 'src/modules/category/shared/category-shared.service';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductSharedService } from '../shared/product-shared.service';
import { ImagesSharedService } from 'src/modules/images/shared/images-shared.service';

@Injectable()
export class CreateProductService {
  constructor(
    private readonly share: ProductSharedService,
    private readonly categoryService: CategorySharedService,
    private readonly imageService: ImagesSharedService,
  ) {}

  async create(data: CreateProductDTO) {
    try {
      const slug = await this.share.generateSlug(data.name);

      const category = await this.categoryService.getCategoryOrCreate(
        data.category,
      );

      const imageDocs = await Promise.all(
        data.images.map(async (image) => {
          const imageDoc = await this.imageService.updateAlt(
            image.publicId,
            image.alt,
          );

          if (!imageDoc) throw new Error(`Image not found: ${image.publicId}`);

          return imageDoc._id;
        }),
      );

      await this.share.productModel.create({
        ...data,
        images: imageDocs,
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
