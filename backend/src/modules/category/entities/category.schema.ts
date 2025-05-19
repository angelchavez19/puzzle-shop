import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from '../../product/entities/product.schema';
import { Coupon } from '../../../schemas/coupon.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ type: mongoose.Schema.Types.String, required: true, unique: true })
  name: string;

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

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Product' })
  products: Product[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Coupon' })
  coupons: Coupon[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
