import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;

@Schema()
export class RefreshToken {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  token: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
    name: 'user_agent',
  })
  userAgent: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  ip: string;
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
    ref: 'User',
  })
  user: User;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
