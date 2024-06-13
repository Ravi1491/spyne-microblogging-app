import { IsOptional } from 'class-validator';

export class UpdateUserInput {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  mobileNumber: string;
}
