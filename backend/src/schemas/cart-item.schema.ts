import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';

export type CartItemDocument = HydratedDocument<CartItem>;

@Schema()
export class CartItem {
  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  quantity: number;

  @Prop({ type: mongoose.Schema.Types.Boolean, required: true })
  isSelected: boolean;

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  })
  product: Product;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
