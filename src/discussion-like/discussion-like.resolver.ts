import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';
import { DiscussionLikeService } from './discussion-like.service';
import { CreateDiscussionLikeInput } from './dto/create-discussion-like.input';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { User } from 'src/user/entities/user.entity';
import { LikeEntityType, LikeType } from 'src/utils/enum';
import { DiscussionLike } from './entities/discussion-like.entity';
import { DiscussionService } from 'src/discussion/discussion.service';
import { UserService } from 'src/user/user.service';
import { GetPaginatedFilter } from 'src/utils/type';
import { getPaginationFilters } from 'src/utils/helper';
import { CommentService } from 'src/comment/comment.service';
import { CreateCommentLikeInput } from './dto/create-comment-like.input';

@Resolver('DiscussionLike')
export class DiscussionLikeResolver {
  constructor(
    private readonly discussionLikeService: DiscussionLikeService,
    private readonly discussionService: DiscussionService,
    private readonly commentService: CommentService,
    private readonly userService: UserService,
  ) {}

  @Mutation('createDiscussionLikeDisLike')
  async createDiscussionLike(
    @Args('createDiscussionLikeInput')
    createDiscussionLikeInput: CreateDiscussionLikeInput,
    @CurrentUser('user') currentUser: User,
  ) {
    try {
      const { type, discussionId } = createDiscussionLikeInput;

      const discussion = await this.discussionService.findOne({
        id: discussionId,
      });

      if (!discussion) {
        throw new Error('Discussion does not exist');
      }

      const existingLike = await this.discussionLikeService.findOne({
        userId: currentUser.id,
        entityType: LikeEntityType.DISCUSSION,
        discussionId,
      });

      if (existingLike) {
        // If the existing like type is the same as the new one, we do nothing or return an error.
        if (existingLike.type === type) {
          throw new Error(
            `You have already ${type === LikeType.LIKE ? 'liked' : 'disliked'} this discussion.`,
          );
        }

        // If the existing like type is different, remove it before adding the new one.
        await this.discussionLikeService.delete({
          userId: currentUser.id,
          entityType: LikeEntityType.DISCUSSION,
          discussionId,
        });
      }

      createDiscussionLikeInput.userId = currentUser.id;
      createDiscussionLikeInput.entityType = LikeEntityType.DISCUSSION;

      return this.discussionLikeService.create(createDiscussionLikeInput);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation('createCommentLikeDisLike')
  async deleteDiscussionLike(
    @Args('createCommentLikeInput')
    createCommentLikeInput: CreateCommentLikeInput,
    @CurrentUser('user') currentUser: User,
  ) {
    try {
      const { type, commentId } = createCommentLikeInput;

      const discussion = await this.commentService.findOne({
        id: commentId,
      });

      if (!discussion) {
        throw new Error('Comment does not exist');
      }

      const existingLike = await this.discussionLikeService.findOne({
        userId: currentUser.id,
        entityType: LikeEntityType.COMMENT,
        commentId,
      });

      if (existingLike) {
        // If the existing like type is the same as the new one, we do nothing or return an error.
        if (existingLike.type === type) {
          throw new Error(
            `You have already ${type === LikeType.LIKE ? 'liked' : 'disliked'} this comment.`,
          );
        }

        // If the existing like type is different, remove it before adding the new one.
        await this.discussionLikeService.delete({
          userId: currentUser.id,
          entityType: LikeEntityType.COMMENT,
          commentId,
        });
      }

      createCommentLikeInput.userId = currentUser.id;
      createCommentLikeInput.entityType = LikeEntityType.COMMENT;

      return this.discussionLikeService.create(createCommentLikeInput);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Query('getDiscussionLikeDisLike')
  async getDiscussionLikeDisLike(
    @Args('discussionId') discussionId: string,
    @Args('filter') filter: GetPaginatedFilter,
  ) {
    try {
      const { offset, limit, createdAtOrder } = getPaginationFilters(filter);

      const { total, rows } = await this.discussionLikeService.findAndCountAll(
        {
          discussionId,
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
        likes: rows,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Query('getCommentLikeDisLike')
  async getCommentLikeDisLike(
    @Args('commentId') commentId: string,
    @Args('filter') filter: GetPaginatedFilter,
  ) {
    try {
      const { offset, limit, createdAtOrder } = getPaginationFilters(filter);

      const { total, rows } = await this.discussionLikeService.findAndCountAll(
        {
          commentId,
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
        likes: rows,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ResolveField()
  async discussion(@Parent() parent: DiscussionLike) {
    if (parent.entityType === LikeEntityType.COMMENT) return null;

    return this.discussionService.findOne({ id: parent.discussionId });
  }

  @ResolveField()
  async comment(@Parent() parent: DiscussionLike) {
    if (parent.entityType === LikeEntityType.DISCUSSION) return null;

    return this.commentService.findOne({ id: parent.commentId });
  }

  @ResolveField()
  async user(@Parent() parent: DiscussionLike) {
    return this.userService.findOne({ id: parent.userId });
  }
}
