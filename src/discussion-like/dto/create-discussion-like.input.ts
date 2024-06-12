import { LikeEntityType } from 'src/graphql';
import { LikeType } from 'src/utils/enum';

export class CreateDiscussionLikeInput {
  type: LikeType;
  entityType: LikeEntityType;
  discussionId: string;
  commentId?: string;
  userId: string;
}
