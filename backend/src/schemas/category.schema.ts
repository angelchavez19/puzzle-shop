import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';
import { Coupon } from './coupon.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.Date,
    required: true,
    name: 'created_at',
  })
  createdAt: Date;

  @Prop({
    type: mongoose.Schema.Types.Date,
    required: true,
    name: 'updated_at',
  })
  updatedAt: Date;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Product' })
  products: Product[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Coupon' })
  coupons: Coupon[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
