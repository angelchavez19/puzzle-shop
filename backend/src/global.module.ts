import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigCommonService } from './common/config.common';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './schemas/address.schema';
import { CartItem, CartItemSchema } from './schemas/cart-item.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { Coupon, CouponSchema } from './schemas/coupon.schema';
import { Order, OrderSchema } from './schemas/order.schema';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresh-token.schema';
import { Review, ReviewSchema } from './schemas/review.schema';
import { User, UserSchema } from './schemas/user.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Address.name, schema: AddressSchema },
      { name: CartItem.name, schema: CartItemSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Coupon.name, schema: CouponSchema },
      { name: Order.name, schema: OrderSchema },
      { name: Payment.name, schema: PaymentSchema },
      { name: Product.name, schema: ProductSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ConfigService, ConfigCommonService],
  exports: [ConfigService, ConfigCommonService],
})
export class GlobalModule {}
