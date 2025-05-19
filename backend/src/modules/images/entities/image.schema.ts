import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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
}

export const ImageSchema = SchemaFactory.createForClass(Image);
