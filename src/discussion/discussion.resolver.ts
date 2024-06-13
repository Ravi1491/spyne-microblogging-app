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
import { HashtagService } from './hashtag.service';
import { DiscussionHashTagService } from './discussion-hashtag.service';

@Resolver('Discussion')
export class DiscussionResolver {
  constructor(
    private readonly discussionService: DiscussionService,
    private readonly userService: UserService,
    private readonly hashtagService: HashtagService,
    private readonly discussionHashTagService: DiscussionHashTagService,
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
    @CurrentUser('user') currentUser: User,
  ) {
    try {
      const { offset, limit, createdAtOrder } = getPaginationFilters(filter);

      const { total, rows } = await this.discussionService.findAndCountAll(
        {
          userId: currentUser.id,
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

  @Query('getDiscussionByHashtag')
  async getDiscussionByHashtag(
    @Args('hashtag') hashtag: string,
    @Args('filter') filter: GetPaginatedFilter,
  ) {
    try {
      const { offset, limit, createdAtOrder } = getPaginationFilters(filter);

      const hashtagExists = await this.hashtagService.findOne({
        name: hashtag,
      });

      if (!hashtagExists) {
        throw new Error('Hashtag does not exist');
      }

      const discussionHashtags = await this.discussionHashTagService.find({
        hashtagId: hashtagExists.id,
      });

      const { total, rows } = await this.discussionService.findAndCountAll(
        {
          id: {
            [Op.in]: discussionHashtags.map((discussionHashtag) => {
              return discussionHashtag.discussionId;
            }),
          },
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
  async findOne(@Args('id') id: string) {
    const discussion = await this.discussionService.findOne({ id });

    if (!discussion) {
      throw new Error('Discussion does not exist');
    }

    return discussion;
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

      const discussion = await this.discussionService.create(
        createDiscussionInput,
      );

      if (createDiscussionInput.hashtags) {
        await Promise.all(
          createDiscussionInput.hashtags.map(async (name) => {
            const hashtag = await this.hashtagService.findOne({ name });

            if (hashtag) {
              const existingDiscussionHashtag =
                await this.discussionHashTagService.findOne({
                  discussionId: discussion.id,
                  hashtagId: hashtag.id,
                });

              if (!existingDiscussionHashtag) {
                await this.discussionHashTagService.create({
                  discussionId: discussion.id,
                  hashtagId: hashtag.id,
                });
              }
            } else {
              const newHashtag = await this.hashtagService.create({ name });

              await this.discussionHashTagService.create({
                discussionId: discussion.id,
                hashtagId: newHashtag.id,
              });
            }
          }),
        );
      }

      return discussion;
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
      const user = await this.userService.findOne({ id: currentUser.id });

      if (!user) {
        throw new Error('User does not exist');
      }

      const discussion = await this.discussionService.findOne({ id });

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
  async remove(@Args('id') id: string, @CurrentUser('user') currentUser: User) {
    try {
      const user = await this.userService.findOne({ id: currentUser.id });

      if (!user) {
        throw new Error('User does not exist');
      }

      const discussion = await this.discussionService.findOne({ id });

      if (!discussion) {
        throw new Error('Discussion does not exist');
      }

      await this.discussionService.delete({ id });

      return 'Discussion deleted successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ResolveField()
  async user(@Parent() parent: Discussion) {
    return this.userService.findOne({ id: parent.userId });
  }

  @ResolveField()
  async hashtags(@Parent() parent: Discussion) {
    try {
      const discussionHashtags = await this.discussionHashTagService.find({
        discussionId: parent.id,
      });

      if (!discussionHashtags.length) {
        return [];
      }

      const hashtags = await Promise.all(
        discussionHashtags.map(async (discussionHashtag) => {
          const hashtag = await this.hashtagService.findOne({
            id: discussionHashtag.hashtagId,
          });

          return hashtag.name;
        }),
      );

      return hashtags;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
