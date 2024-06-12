import { CommentType } from 'src/utils/enum';

export class CreateCommentInput {
  content: string;
  userId: string;
  discussionId: string;
  parentCommentId: string;
  type: CommentType;
}
