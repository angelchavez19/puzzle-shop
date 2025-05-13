import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { CreateProductDTO } from './dto/create-product.dto';
import { Category } from 'src/schemas/category.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async getAllProducts() {
    return await this.productModel
      .find()
      .select(
        '_id name description price stock images tags rating_avg category',
      )
      .populate('category', 'name');
  }

  async createNewProdut(data: CreateProductDTO) {
    try {
      let category = await this.categoryModel.findOne({ name: data.category });

      if (!category) {
        category = await this.categoryModel.create({ name: data.category });
      }

      await this.productModel.create({
        ...data,
        images: [],
        ratingAvg: 0,
        category: category._id,
      });
    } catch {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create product',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
