import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from './order.schema';
import { Review } from './review.schema';
import { CartItem } from './cart-item.schema';
import { Coupon } from './coupon.schema';
import { Category } from './category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

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
  images: string[];

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
}

export const ProductSchema = SchemaFactory.createForClass(Product);
