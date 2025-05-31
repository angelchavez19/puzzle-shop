import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigCommonService } from 'src/global/services/config.service';

export const jwtConfig: JwtModuleAsyncOptions = {
  global: true,
  inject: [ConfigCommonService],
  useFactory: (configService: ConfigCommonService) => ({
    secret: configService.secret_key,
    signOptions: { expiresIn: '1d' },
  }),
};
