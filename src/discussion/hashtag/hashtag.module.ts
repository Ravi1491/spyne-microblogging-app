import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagResolver } from './hashtag.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hashtag } from './entities/hashtag.entity';

@Module({
  imports: [SequelizeModule.forFeature([Hashtag])],
  providers: [HashtagResolver, HashtagService],
  exports: [HashtagService],
})
export class HashtagModule {}
