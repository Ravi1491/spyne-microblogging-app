import { CreateHashtagInput } from './create-hashtag.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateHashtagInput extends PartialType(CreateHashtagInput) {
  id: number;
}
