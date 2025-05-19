import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../entities/product.schema';
import { Model } from 'mongoose';
import { generateUniqueSlug, slugify } from 'src/utils/slug.utils';

type Query =
  | string
  | string[]
  | Record<string, number | boolean | string | object>;

@Injectable()
export class ProductSharedService {
  constructor(
    @InjectModel(Product.name)
    readonly productModel: Model<Product>,
  ) {}

  findAllNotDeleteProducts(
    query: Query = '_id name slug description price stock images tags category',
  ) {
    return this.productModel
      .find()
      .select(query)
      .where({ isDelete: false })
      .populate('category', 'name')
      .populate('images', 'publicId url alt')
      .exec();
  }

  findAllDeleteProducts(
    query: Query = '_id name slug description price stock images tags category',
  ) {
    return this.productModel
      .find()
      .select(query)
      .where({ isDelete: true })
      .populate('category', 'name')
      .populate('images', 'publicId url alt')
      .exec();
  }

  findProductBySlug(slug: string) {
    return this.productModel
      .findOne({ slug })
      .select(
        '_id name slug description price stock images tags category ratingAvg reviews',
      )
      .where({ isDelete: false })
      .populate('category', 'name')
      .populate('images', 'publicId url alt')
      .exec();
  }

  findOne(filter: object) {
    return this.productModel.findOne(filter);
  }

  async generateSlug(name: string) {
    const slug = slugify(name);
    const productWithSlug = await this.findOne({ slug }).select('_id');

    if (productWithSlug) return generateUniqueSlug(name);

    return slug;
  }
}
