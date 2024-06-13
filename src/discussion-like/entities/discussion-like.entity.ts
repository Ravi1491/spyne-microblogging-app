import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Comment } from 'src/comment/entities/comment.entity';
import { Discussion } from 'src/discussion/entities/discussion.entity';
import { LikeEntityType, LikeType } from 'src/graphql';
import { User } from 'src/user/entities/user.entity';

@Table({
  underscored: true,
})
export class DiscussionLike extends Model<DiscussionLike> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  type: LikeType;

  @Column({ allowNull: false })
  entityType: LikeEntityType;

  @ForeignKey(() => Discussion)
  @Column({ allowNull: true })
  discussionId: string;

  @ForeignKey(() => Comment)
  @Column({ allowNull: true })
  commentId: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Discussion)
  discussion: Discussion;

  @BelongsTo(() => Comment)
  comment: Comment;
}
