import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Category {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.Date, required: true })
  createdAt: string;

  @Prop({ type: mongoose.Schema.Types.Date, required: true })
  updatedAt: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
