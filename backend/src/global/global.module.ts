import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigCommonService } from './services/config.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorResponseNormalizerFilter } from './filters/error-response-normalizer.filter';
import { databaseConfig } from 'src/config/database.config';
import { jwtConfig } from 'src/config/jwt.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync(jwtConfig),
    MongooseModule.forRootAsync(databaseConfig),
  ],
  providers: [
    ConfigService,
    ConfigCommonService,
    ErrorResponseNormalizerFilter,
  ],
  exports: [ConfigCommonService, ErrorResponseNormalizerFilter],
})
export class GlobalModule {}
