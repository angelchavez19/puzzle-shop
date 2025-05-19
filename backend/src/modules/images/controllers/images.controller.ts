import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImagesService } from '../application/upload.service';
import { ConfigCommonService } from 'src/common/config.common';

@Controller('image')
export class ImagesController {
  constructor(
    private readonly config: ConfigCommonService,
    private readonly upload: UploadImagesService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.upload.upload(file, {
      folder: this.config.cloudinaryProductFolder,
    });
  }
}
