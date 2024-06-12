import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionResolver } from './discussion.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Discussion } from './entities/discussion.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Discussion]), UserModule],
  providers: [DiscussionResolver, DiscussionService],
  exports: [DiscussionService],
})
export class DiscussionModule {}
