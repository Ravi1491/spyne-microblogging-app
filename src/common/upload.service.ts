import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  uploadImage(file: Express.Multer.File) {
    if (!file) {
      return { message: 'No file uploaded!' };
    }
    return {
      message: 'File uploaded successfully!',
      filePath: file.path,
    };
  }
}
