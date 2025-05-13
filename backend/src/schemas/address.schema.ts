import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Order } from './order.schema';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  address: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
    name: 'reference_address',
  })
  referenceAddress: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  city: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
    name: 'postal_code',
  })
  postalCode: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  country: string;

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'User' })
  users: User[];

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Order' })
  orders: Order[];
}

export const AddressSchema = SchemaFactory.createForClass(Address);
