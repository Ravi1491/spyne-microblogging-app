import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { UserService } from 'src/user/user.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { CommentType } from 'src/utils/enum';
import { Comment } from './entities/comment.entity';
import { DiscussionService } from 'src/discussion/discussion.service';

@Resolver('Comment')
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly discussionService: DiscussionService,
  ) {}

  @Mutation('createComment')
  async create(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser('user') currentUser: User,
  ) {
    try {
      const user = await this.userService.findOne({ id: currentUser.id });

      if (!user) {
        throw new Error('User does not exist');
      }

      const discussion = await this.discussionService.findOne({
        id: createCommentInput.discussionId,
      });

      if (!discussion) {
        throw new Error('Discussion does not exist');
      }

      if (createCommentInput.type === CommentType.COMMENT) {
        const existingComment = await this.commentService.findOne({
          type: CommentType.COMMENT,
          discussionId: createCommentInput.discussionId,
          userId: user.id,
        });

        if (existingComment) {
          throw new Error(
            'User has already commented on this discussion. You can reply to the comment instead of creating a new one',
          );
        }

        createCommentInput.parentCommentId = null;
      } else if (createCommentInput.type === CommentType.REPLY) {
        if (!createCommentInput.parentCommentId) {
          throw new Error('Parent comment ID is required for reply comment');
        }

        const parentComment = await this.commentService.findOne({
          id: createCommentInput.parentCommentId,
        });

        if (!parentComment) {
          throw new Error('Parent comment does not exist');
        }
      }

      createCommentInput.userId = user.id;

      return this.commentService.create(createCommentInput);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation('updateComment')
  async update(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
    @CurrentUser('user') currentUser: User,
  ) {
    try {
      const user = await this.userService.findOne({ id: currentUser.id });

      if (!user) {
        throw new Error('User does not exist');
      }

      const comment = await this.commentService.findOne({
        id: updateCommentInput.id,
      });

      if (!comment) {
        throw new Error('Comment does not exist');
      }

      const commentOwner = await this.commentService.findOne({
        id: updateCommentInput.id,
        userId: user.id,
      });

      if (!commentOwner) {
        throw new Error('User is not the owner of the comment');
      }

      const updatedComment = await this.commentService.update(
        { id: updateCommentInput.id },
        updateCommentInput,
      );

      return updatedComment[1][0];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation('removeComment')
  async remove(@Args('id') id: string, @CurrentUser('user') currentUser: User) {
    try {
      const user = await this.userService.findOne({ id: currentUser.id });

      if (!user) {
        throw new Error('User does not exist');
      }

      const comment = await this.commentService.findOne({ id });

      if (!comment) {
        throw new Error('Comment does not exist');
      }

      await this.commentService.delete({ id });

      return 'Comment deleted successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ResolveField()
  async user(@Parent() comment: Comment) {
    return this.userService.findOne({ id: comment.userId });
  }

  @ResolveField()
  async parentComment(@Parent() comment: Comment) {
    return this.commentService.findOne({ id: comment.parentCommentId });
  }

  @ResolveField()
  async discussion(@Parent() comment: Comment) {
    return this.discussionService.findOne({
      id: comment.discussionId,
    });
  }
}
