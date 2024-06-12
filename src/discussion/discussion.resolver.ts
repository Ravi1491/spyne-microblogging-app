import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionInput } from './dto/create-discussion.input';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { GetPaginatedFilter } from 'src/utils/type';
import { getPaginationFilters } from 'src/utils/helper';
import { Public } from 'src/auth/decorators/public';
import { Op } from 'sequelize';
import { Discussion } from './entities/discussion.entity';
import { UpdateDiscussionInput } from './dto/update-discussion.input';

@Resolver('Discussion')
export class DiscussionResolver {
  constructor(
    private readonly discussionService: DiscussionService,
    private readonly userService: UserService,
  ) {}

  @Query('getAllDiscussions')
  async getAllDiscussions(@Args('filter') filter: GetPaginatedFilter) {
    try {
      const { offset, limit, createdAtOrder } = getPaginationFilters(filter);

      const { total, rows } = await this.discussionService.findAndCountAll(
        {},
        {
          order: [['createdAt', createdAtOrder]],
          offset,
          limit,
        },
      );

      return {
        total,
        offset,
        limit,
        discussions: rows,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Query('getUserDiscussions')
  async getUserDiscussions(
    @Args('filter') filter: GetPaginatedFilter,
    @Args('userId') userId: string,
  ) {
    try {
      const { offset, limit, createdAtOrder } = getPaginationFilters(filter);

      const { total, rows } = await this.discussionService.findAndCountAll(
        {
          userId,
        },
        {
          order: [['createdAt', createdAtOrder]],
          offset,
          limit,
        },
      );

      return {
        total,
        offset,
        limit,
        discussions: rows,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Query('searchDiscussions')
  async searchDiscussions(
    @Args('query') query: string,
    @Args('filter') filter: GetPaginatedFilter,
  ) {
    try {
      const { offset, limit, createdAtOrder } = getPaginationFilters(filter);

      const { total, rows } = await this.discussionService.findAndCountAll(
        {
          text: { [Op.iLike]: `%${query}%` },
        },
        {
          order: [['createdAt', createdAtOrder]],
          offset,
          limit,
        },
      );

      return {
        total,
        offset,
        limit,
        discussions: rows,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Query('getHashtagDiscussions')
  async getHashtagDiscussions(
    @Args('hashtag') hashtag: string,
    @Args('filter') filter: GetPaginatedFilter,
  ) {
    try {
      const { offset, limit, createdAtOrder } = getPaginationFilters(filter);

      const { total, rows } = await this.discussionService.findAndCountAll(
        {
          name: { [Op.iLike]: `%${hashtag}%` },
        },
        {
          order: [['createdAt', createdAtOrder]],
          offset,
          limit,
        },
      );

      return {
        total,
        offset,
        limit,
        discussions: rows,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Query('getDiscussion')
  findOne(@Args('id') id: string) {
    return this.discussionService.findOne({ id });
  }

  @Mutation('createDiscussion')
  async create(
    @Args('createDiscussionInput') createDiscussionInput: CreateDiscussionInput,
    @CurrentUser('user') currentUser: User,
  ) {
    try {
      const user = await this.userService.findOne({ id: currentUser.id });

      if (!user) {
        throw new Error('User does not exist');
      }

      createDiscussionInput.userId = user.id;

      return this.discussionService.create(createDiscussionInput);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation('updateDiscussion')
  async update(
    @Args('id') id: string,
    @Args('updateDiscussionInput') updateDiscussionInput: UpdateDiscussionInput,
    @CurrentUser('user') currentUser: User,
  ) {
    try {
      const user = this.userService.findOne({ id: currentUser.id });

      if (!user) {
        throw new Error('User does not exist');
      }

      const discussion = this.discussionService.findOne({ id });

      if (!discussion) {
        throw new Error('Discussion does not exist');
      }

      const updatedDiscussion = await this.discussionService.update(
        { id },
        updateDiscussionInput,
      );

      return updatedDiscussion[1][0];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation('removeDiscussion')
  remove(@Args('id') id: string, @CurrentUser('user') currentUser: User) {
    try {
      const user = this.userService.findOne({ id: currentUser.id });

      if (!user) {
        throw new Error('User does not exist');
      }

      const discussion = this.discussionService.findOne({ id });

      if (!discussion) {
        throw new Error('Discussion does not exist');
      }

      return this.discussionService.delete({ id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ResolveField()
  async user(@Parent() parent: Discussion) {
    return this.userService.findOne({ id: parent.userId });
  }
}
