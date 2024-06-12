import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionResolver } from './discussion.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Discussion } from './entities/discussion.entity';
import { UserModule } from 'src/user/user.module';
import { DiscussionHashtag } from './entities/discussion-hashtag.entity';
import { HashtagModule } from './hashtag/hashtag.module';
import { DiscussionHashTagService } from './discussion-hashtag.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Discussion, DiscussionHashtag]),
    UserModule,
    HashtagModule,
  ],
  providers: [DiscussionResolver, DiscussionService, DiscussionHashTagService],
  exports: [DiscussionService],
})
export class DiscussionModule {}
