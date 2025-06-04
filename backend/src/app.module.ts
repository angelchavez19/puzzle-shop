import { Module } from '@nestjs/common';
import { GlobalModule } from './global/global.module';
import { CategoryModule } from './contexts/category/category.module';

@Module({
  imports: [GlobalModule, CategoryModule],
})
export class AppModule {}
