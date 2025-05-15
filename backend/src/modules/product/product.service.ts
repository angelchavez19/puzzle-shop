import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { CreateProductDTO } from './dto/create-product.dto';
import { Category } from 'src/schemas/category.schema';
import { generateUniqueSlug, slugify } from 'src/utils/slug.utils';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  getAllProducts() {
    return this.productModel
      .find()
      .select('_id name slug description price stock images tags category')
      .where({ isDelete: false })
      .populate('category', 'name');
  }

  async getDeletedProducts() {
    return await this.productModel
      .find()
      .select('_id name slug description price stock images tags category')
      .where({ isDelete: true })
      .populate('category', 'name');
  }

  async getProductBySlug(slug: string) {
    const product = await this.productModel
      .findOne({ slug })
      .select(
        '_id name slug description price stock images tags ratingAvg category reviews',
      )
      .where({ isDelete: false })
      .populate('category', 'name');

    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  async createNewProduct(data: CreateProductDTO) {
    try {
      let category = await this.categoryModel.findOne({ name: data.category });

      if (!category)
        category = await this.categoryModel.create({ name: data.category });

      let slug = slugify(data.name);
      const productWithSlug = await this.productModel
        .findOne({ slug })
        .select('_id');

      if (productWithSlug) slug = generateUniqueSlug(data.name);

      return this.productModel.create({
        ...data,
        slug,
        images: [],
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

  async updateProductById(id: string, data: UpdateProductDTO) {
    try {
      const updateData: AnyKeys<Product> = { ...data, updatedAt: Date.now() };

      if (data.name) {
        let slug = slugify(data.name);
        const productWithSlug = await this.productModel
          .findOne({ slug, _id: { $ne: id } })
          .select('_id');

        if (productWithSlug) {
          slug = generateUniqueSlug(data.name);
        }

        updateData.slug = slug;
      }

      if (data.category) {
        let category = await this.categoryModel.findOne({
          name: data.category,
        });

        if (!category) {
          category = await this.categoryModel.create({ name: data.category });
        }

        updateData.category = category._id;
      }

      const updated = await this.productModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true },
      );

      if (!updated)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

      return updated;
    } catch {
      if (!data)
        throw new HttpException('Data is required', HttpStatus.BAD_REQUEST);

      throw new HttpException(
        'Failed to update product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async restoreADeletedProductById(id: string) {
    try {
      const updated = await this.productModel.findByIdAndUpdate(
        id,
        { $set: { isDelete: false } },
        { new: true },
      );

      if (!updated)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

      return this.getProductBySlug(updated.slug);
    } catch {
      throw new HttpException(
        'Failed to restore the product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async softDeleteProductById(id: string) {
    try {
      const updated = await this.productModel.findByIdAndUpdate(
        id,
        { $set: { isDelete: true } },
        { new: true },
      );

      if (!updated)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    } catch {
      throw new HttpException(
        'Failed to delete product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
