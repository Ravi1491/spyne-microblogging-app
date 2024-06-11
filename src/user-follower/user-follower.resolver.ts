import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserFollowerService } from './user-follower.service';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { UserService } from 'src/user/user.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { getPaginationFilters } from 'src/utils/helper';
import { GetPaginatedFilter } from 'src/utils/type';

@Resolver('UserFollower')
export class UserFollowerResolver {
  constructor(
    private readonly userFollowerService: UserFollowerService,
    private readonly userService: UserService,
  ) {}

  @Query('getUserFollowers')
  async getUserFollowers(
    @CurrentUser('user') user: User,
    @Args('filter') filter: GetPaginatedFilter,
  ) {
    try {
      const { offset, limit, createdAtOrder } = getPaginationFilters(filter);

      const { total, rows } = await this.userFollowerService.findAndCountAll(
        {
          followerId: user.id,
        },
        {
          order: [['createdAt', createdAtOrder]],
          offset,
          limit,
        },
      );

      const followers = rows.map((follower) => {
        return this.userService.findOne({ id: follower.followingId });
      });

      return {
        total,
        offset,
        limit,
        followers,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation('followUser')
  async followUser(
    @Args('followingUserId') followingUserId: string,
    @CurrentUser('user') user: User,
  ) {
    try {
      const userExist = await this.userService.findOne({ id: followingUserId });

      if (!userExist) {
        throw new Error('User does not exist');
      }

      const isFollowing = await this.userFollowerService.findOne({
        followerId: user.id,
        followingId: followingUserId,
      });

      if (isFollowing) {
        throw new Error('User already followed');
      }

      await this.userFollowerService.create({
        followerId: user.id,
        followingId: followingUserId,
      });

      return 'User followed successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation('unfollowUser')
  async unfollowUser(
    @Args('followingUserId') followingUserId: string,
    @CurrentUser('user') user: User,
  ) {
    try {
      const userExist = await this.userService.findOne({ id: followingUserId });

      if (!userExist) {
        throw new Error('User does not exist');
      }

      const isFollowing = await this.userFollowerService.findOne({
        followerId: user.id,
        followingId: followingUserId,
      });

      if (!isFollowing) {
        throw new Error('User not followed');
      }

      await this.userFollowerService.delete({
        followerId: user.id,
        followingId: followingUserId,
      });

      return 'User unfollowed successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
