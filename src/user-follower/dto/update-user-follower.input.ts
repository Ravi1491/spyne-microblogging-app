import { CreateUserFollowerInput } from './create-user-follower.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserFollowerInput extends PartialType(
  CreateUserFollowerInput,
) {
  id: string;
}
