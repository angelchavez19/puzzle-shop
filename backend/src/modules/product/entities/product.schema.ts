import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from '../../../schemas/order.schema';
import { Review } from '../../../schemas/review.schema';
import { CartItem } from '../../../schemas/cart-item.schema';
import { Coupon } from '../../../schemas/coupon.schema';
import { Category } from '../../category/entities/category.schema';
import { Image } from 'src/modules/images/entities/image.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true, unique: true })
  slug: string;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    required: true,
  })
  description: {
    longDescription: string;
    [key: string]: any;
  };

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  price: number;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  stock: number;

  @Prop({ type: [mongoose.Schema.Types.String], required: true })
  tags: string[];

  @Prop({
    type: mongoose.Schema.Types.Number,
    required: true,
    name: 'rating_avg',
  })
  ratingAvg: number;

  @Prop({
    type: mongoose.Schema.Types.Date,
    required: true,
    name: 'created_at',
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: mongoose.Schema.Types.Date,
    required: true,
    name: 'updated_at',
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({
    type: mongoose.Schema.Types.Boolean,
    required: true,
    name: 'is_delete',
    default: false,
  })
  isDelete: false;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Order' })
  orders: Order[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Review' })
  reviews: Review[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'CartItem' })
  cartItems: CartItem[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Coupon' })
  coupons: Coupon[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  })
  category: Category;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Image',
  })
  images: Image[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
