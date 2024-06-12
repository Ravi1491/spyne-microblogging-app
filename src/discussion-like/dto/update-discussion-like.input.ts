import { CreateDiscussionLikeInput } from './create-discussion-like.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDiscussionLikeInput extends PartialType(CreateDiscussionLikeInput) {
  id: number;
}
