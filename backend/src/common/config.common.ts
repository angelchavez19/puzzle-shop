import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigCommonService {
  constructor(private readonly configService: ConfigService) {}

  // App Configuration

  get port(): number {
    return this.configService.get<number>('PORT') || 8000;
  }

  get databaseURL(): string {
    return this.configService.get<string>('DATABASE_URL') || '';
  }

  // Secrets

  get secretKey(): string {
    return this.configService.get<string>('JWT_SECRET_KEY') || 'secretKey';
  }

  // Client

  get clientURL(): string {
    return this.configService.get<string>('CLIENT_URL') || 'secretKey';
  }

  // Cloudinary

  get cloudinaryCloudName(): string {
    return (
      this.configService.get<string>('CLOUDINARY_CLOUD_NAME') || 'secretKey'
    );
  }

  get cloudinaryApiKey(): string {
    return this.configService.get<string>('CLOUDINARY_API_KEY') || 'secretKey';
  }

  get cloudinaryApiSecret(): string {
    return (
      this.configService.get<string>('CLOUDINARY_API_SECRET') || 'secretKey'
    );
  }

  get cloudinaryProductFolder(): string {
    return (
      this.configService.get<string>('CLOUDINARY_PRODUCT_FOLDER') || 'secretKey'
    );
  }
}
