import { Module } from '@nestjs/common';
import { DiscussionLikeService } from './discussion-like.service';
import { DiscussionLikeResolver } from './discussion-like.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiscussionLike } from './entities/discussion-like.entity';
import { DiscussionModule } from 'src/discussion/discussion.module';
import { UserModule } from 'src/user/user.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    SequelizeModule.forFeature([DiscussionLike]),
    DiscussionModule,
    CommentModule,
    UserModule,
  ],
  providers: [DiscussionLikeResolver, DiscussionLikeService],
})
export class DiscussionLikeModule {}
