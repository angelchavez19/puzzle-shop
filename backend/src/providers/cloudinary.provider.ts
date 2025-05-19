import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dyb6gvqzx',
      api_key: '222257769378558',
      api_secret: '6EcRNfHjxq3m4cGlzqZCoe-FgoY',
    });
  },
};
