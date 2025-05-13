import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from './order.schema';

export const PaymentMethodE = {
  stripe: 'STRIPE',
  paypal: 'PAYPAL',
  mercadoPago: 'MERCADO_PAGO',
} as const;

export const PaymentStatusE = {
  pending: 'PENDING',
  paid: 'PAID',
  failed: 'FAILED',
} as const;

export type PaymentDocument = HydratedDocument<Payment>;
export type PaymentMethodT =
  (typeof PaymentMethodE)[keyof typeof PaymentMethodE];
export type PaymentStatusT =
  (typeof PaymentStatusE)[keyof typeof PaymentStatusE];

@Schema()
export class Payment {
  @Prop({ type: PaymentMethodE, required: true })
  method: PaymentMethodT;

  @Prop({ type: PaymentStatusE, required: true })
  status: PaymentStatusT;

  @Prop({ type: mongoose.Schema.Types.String, name: 'transaction_id' })
  transactionId: string;

  @Prop({ type: mongoose.Schema.Types.Date, name: 'paid_id' })
  paidAt: Date;

  @Prop({ type: mongoose.Schema.Types.Number, name: 'amount_paid' })
  amountPaid: number;

  @Prop({ type: mongoose.Schema.Types.String })
  currency: string;

  @Prop({ type: mongoose.Schema.Types.String, name: 'receiptUrl' })
  receiptUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' })
  order: Order;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
