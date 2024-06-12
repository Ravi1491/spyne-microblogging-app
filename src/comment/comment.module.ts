import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiscussionModule } from 'src/discussion/discussion.module';
import { UserModule } from 'src/user/user.module';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Comment]),
    DiscussionModule,
    UserModule,
  ],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
