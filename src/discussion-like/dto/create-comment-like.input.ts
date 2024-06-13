import { LikeEntityType } from 'src/graphql';
import { LikeType } from 'src/utils/enum';

export class CreateCommentLikeInput {
  type: LikeType;
  entityType: LikeEntityType;
  commentId: string;
  userId: string;
}
