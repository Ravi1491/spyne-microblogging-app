import { Global, Module } from '@nestjs/common';
import { DateScalar } from './date-scaler.service';
import { UploadController } from './upload.controller';
import { S3Service } from './s3.service';

@Global()
@Module({
  providers: [DateScalar, S3Service],
  controllers: [UploadController],
})
export class CommonModule {}
