import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigCommonService } from 'src/global/services/config.service';

export const databaseConfig: MongooseModuleAsyncOptions = {
  inject: [ConfigCommonService],
  useFactory: (configService: ConfigCommonService) => ({
    uri: configService.database_url,
  }),
};
