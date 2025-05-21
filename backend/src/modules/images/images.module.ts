import { Module } from '@nestjs/common';
import { UploadImagesService } from './application/upload.service';
import { ImagesController } from './controllers/images.controller';
import { ImagesSharedService } from './shared/images-shared.service';

@Module({
  controllers: [ImagesController],
  providers: [UploadImagesService, ImagesSharedService],
})
export class ImagesModule {}
