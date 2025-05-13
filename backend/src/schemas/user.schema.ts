import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { RefreshToken } from './refresh-token.schema';
import { Review } from './review.schema';
import { Address } from './address.schema';
import { Order } from './order.schema';
import { CartItem } from './cart-item.schema';
import { Coupon } from './coupon.schema';

export const UserRoleE = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export const UserProviderE = {
  EMAIL: 'EMAIL',
  GOOGLE: 'GOOGLE',
  FACEBOOK: 'FACEBOOK',
} as const;

export type UserDocument = HydratedDocument<User>;
export type UserRoleT = (typeof UserRoleE)[keyof typeof UserRoleE];
export type UserProviderT = (typeof UserProviderE)[keyof typeof UserProviderE];

@Schema()
export class User {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  name: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    unique: true,
  })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String })
  password: string;

  @Prop({
    type: UserRoleE,
    default: UserRoleE.CUSTOMER,
  })
  role: UserRoleT;

  @Prop({ type: UserProviderE, default: UserProviderE.EMAIL })
  provider: UserProviderT;

  @Prop({
    type: mongoose.Schema.Types.Date,
    name: 'created_at',
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: mongoose.Schema.Types.Date,
    name: 'updated_at',
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'RefreshToken' })
  refreshTokens: RefreshToken[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Address' })
  addresses: Address[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Review' })
  reviews: Review[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Order' })
  orders: Order[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'CartItem' })
  cartItems: CartItem[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Coupon' })
  coupons: Coupon[];
}

export const UserSchema = SchemaFactory.createForClass(User);
