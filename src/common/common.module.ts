import { Global, Module } from '@nestjs/common';
import { DateScalar } from './date-scaler.service';

@Global()
@Module({
  providers: [DateScalar],
})
export class CommonModule {}
