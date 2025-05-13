import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Address } from './address.schema';
import { User } from './user.schema';
import { Payment } from './payment.schema';
import { Product } from './product.schema';

export const OrderStatusE = {
  pending: 'PENDING',
  paid: 'PAID',
  shipped: 'SHIPPED',
  delivered: 'DELIVERED',
  cancelled: 'CANCELLED',
} as const;

export type OrderDocument = HydratedDocument<Order>;
export type OrderStatusT = (typeof OrderStatusE)[keyof typeof OrderStatusE];

@Schema()
export class Order {
  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
    name: 'num_order',
  })
  numOrder: string;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  total: number;

  @Prop({
    type: mongoose.Schema.Types.String,
    enum: OrderStatusE,
    required: true,
  })
  status: OrderStatusT;

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

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Address',
  })
  address: Address;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' })
  payment: Payment;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Product' })
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
