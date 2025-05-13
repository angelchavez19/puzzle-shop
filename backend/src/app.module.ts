import { Module } from '@nestjs/common';
import { GlobalModule } from './global.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/puzzle-shop'),
    GlobalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
