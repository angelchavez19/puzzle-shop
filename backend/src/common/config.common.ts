import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigCommonService {
  constructor(private readonly configService: ConfigService) {}

  get secretKey(): string {
    return this.configService.get<string>('JWT_SECRET_KEY') || 'secretKey';
  }

  get port(): number {
    return this.configService.get<number>('PORT') || 8000;
  }
}
