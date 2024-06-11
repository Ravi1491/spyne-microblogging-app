import { CreateDiscussionInput } from './create-discussion.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDiscussionInput extends PartialType(CreateDiscussionInput) {
  id: string;
}
