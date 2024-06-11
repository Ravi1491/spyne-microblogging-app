import { Module } from '@nestjs/common';
import { UserFollowerService } from './user-follower.service';
import { UserFollowerResolver } from './user-follower.resolver';
import { UserFollower } from './entities/user-follower.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([UserFollower]), UserModule],
  providers: [UserFollowerResolver, UserFollowerService],
  exports: [UserFollowerService],
})
export class UserFollowerModule {}
