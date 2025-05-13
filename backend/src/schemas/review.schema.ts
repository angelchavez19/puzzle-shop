import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  comment: string;

  @Prop({
    type: mongoose.Schema.Types.Date,
    required: true,
    name: 'created_at',
    default: Date.now,
  })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  })
  products: Product;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
