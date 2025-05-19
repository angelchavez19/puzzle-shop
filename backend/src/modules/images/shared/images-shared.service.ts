import { Injectable } from '@nestjs/common';
import * as streamifier from 'streamifier';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
} from 'cloudinary';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from '../entities/image.schema';
import { Model } from 'mongoose';

type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class ImagesSharedService {
  constructor(
    @InjectModel(Image.name)
    private readonly imageModel: Model<Image>,
  ) {}

  uploadFile(
    file: Express.Multer.File,
    options?: UploadApiOptions,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          if (error) return reject(error);
          if (result) resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  create(data: object) {
    return this.imageModel.create(data);
  }
}
