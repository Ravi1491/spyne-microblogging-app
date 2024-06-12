import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { multerOptions } from './multer-config';
import { Public } from 'src/auth/decorators/public';

@Controller('upload')
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Public()
  @Post('image')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.s3Service.uploadFile(file);
    return { url: result.Location };
  }
}
