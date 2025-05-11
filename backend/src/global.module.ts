import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigCommonService } from './common/config.common';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [ConfigService, ConfigCommonService],
  exports: [ConfigService, ConfigCommonService],
})
export class GlobalModule {}
