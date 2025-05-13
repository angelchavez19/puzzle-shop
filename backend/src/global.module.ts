import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigCommonService } from './common/config.common';

@Global()
@Module({
  imports: [],
  providers: [ConfigService, ConfigCommonService],
  exports: [ConfigService, ConfigCommonService],
})
export class GlobalModule {}
