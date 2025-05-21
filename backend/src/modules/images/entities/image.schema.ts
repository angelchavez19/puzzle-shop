import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/modules/product/entities/product.schema';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  publicId: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  url: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  format: string;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  width: number;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  height: number;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  bytes: number;

  @Prop({ type: mongoose.Schema.Types.Date, required: true })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  originalFilename: string;

  @Prop({ type: mongoose.Schema.Types.String })
  alt: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  product: Product;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
