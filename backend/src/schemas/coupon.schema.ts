import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';
import { Category } from './category.schema';

export const CouponDiscountTypeE = {
  percent: 'PERCENT',
  amount: 'AMOUNT',
} as const;

export type CouponDocument = HydratedDocument<Coupon>;
export type CouponDiscountTypeT =
  (typeof CouponDiscountTypeE)[keyof typeof CouponDiscountTypeE];

@Schema()
export class Coupon {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  code: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    enum: CouponDiscountTypeE,
    required: true,
    name: 'discount_type',
  })
  discountType: CouponDiscountTypeT;

  @Prop({
    type: mongoose.Schema.Types.Number,
    required: true,
    name: 'discount_value',
  })
  discountValue: number;

  @Prop({
    type: mongoose.Schema.Types.Number,
    name: 'min_purchase',
  })
  minPurchase: number;

  @Prop({
    type: mongoose.Schema.Types.Date,
    required: true,
    name: 'expires_at',
  })
  expiresAt: Date;

  @Prop({
    type: mongoose.Schema.Types.Number,
    name: 'usage_limit',
  })
  usageLimit: number;

  @Prop({
    type: mongoose.Schema.Types.Number,
    name: 'usage_limit_per_person',
  })
  usageLimitPerPerson: number;

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

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  users: User[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Product' })
  products: Product[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Category' })
  categories: Category[];
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
