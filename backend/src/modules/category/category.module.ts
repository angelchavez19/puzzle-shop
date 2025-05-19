import { Module } from '@nestjs/common';
import { CategorySharedService } from './shared/category-shared.service';

@Module({
  controllers: [],
  providers: [CategorySharedService],
})
export class CategoryModule {}
