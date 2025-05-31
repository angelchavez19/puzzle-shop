import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigCommonService {
  constructor(private readonly config: ConfigService) {}

  // App Configuration

  get port(): number {
    return this.config.get<number>('PORT') || 8000;
  }

  // Secrets

  get secret_key(): string {
    return this.config.get<string>('SECRET_KEY') || 'default_secret_key';
  }

  // Database Configuration

  get database_url(): string {
    return (
      this.config.get<string>('DATABASE_URL') ||
      'mongodb://localhost:27017/puzzle-shop'
    );
  }

  // Client Configuration

  get client_url(): string {
    return this.config.get<string>('CLIENT_URL') || 'http://localhost:3000';
  }
}
