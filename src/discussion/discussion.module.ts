import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionResolver } from './discussion.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Discussion } from './entities/discussion.entity';
import { UserModule } from 'src/user/user.module';
import { DiscussionHashtag } from './entities/discussion-hashtag.entity';
import { DiscussionHashTagService } from './discussion-hashtag.service';
import { Hashtag } from './entities/hashtag.entity';
import { HashtagService } from './hashtag.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Discussion, Hashtag, DiscussionHashtag]),
    UserModule,
  ],
  providers: [
    DiscussionResolver,
    DiscussionService,
    HashtagService,
    DiscussionHashTagService,
  ],
  exports: [DiscussionService],
})
export class DiscussionModule {}
