import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImagesSharedService } from '../shared/images-shared.service';
import { UploadApiOptions, UploadApiResponse } from 'cloudinary';

@Injectable()
export class UploadImagesService {
  constructor(private readonly share: ImagesSharedService) {}

  async upload(file: Express.Multer.File, options?: UploadApiOptions) {
    try {
      const data = await this.share.uploadFile(file, options);

      if (data.message) throw new Error();

      const {
        public_id: publicId,
        url,
        format,
        width,
        height,
        bytes,
        created_at,
        original_filename: originalFilename,
      } = data as UploadApiResponse;

      return this.share.create({
        publicId,
        url,
        format,
        width,
        height,
        bytes,
        createdAt: new Date(created_at),
        originalFilename,
      });
    } catch {
      throw new HttpException(
        'Failed to upload image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
