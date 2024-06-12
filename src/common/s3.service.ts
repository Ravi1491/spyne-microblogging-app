import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { applicationConfig } from 'config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: applicationConfig.aws.accessKeyId,
      secretAccessKey: applicationConfig.aws.secretAccessKey,
      region: applicationConfig.aws.region,
    });
  }

  async uploadFile(file) {
    const uploadParams = {
      Bucket: applicationConfig.aws.s3BucketName,
      Key: `${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ACL: 'private',
      ContentType: file.mimetype,
    };
    return this.s3.upload(uploadParams).promise();
  }
}
