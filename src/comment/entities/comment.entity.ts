import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DiscussionLike } from 'src/discussion-like/entities/discussion-like.entity';
import { Discussion } from 'src/discussion/entities/discussion.entity';
import { User } from 'src/user/entities/user.entity';
import { CommentType } from 'src/utils/enum';

@Table({
  underscored: true,
})
export class Comment extends Model<Comment> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  content: string;

  @Column({ allowNull: false })
  type: CommentType;

  @ForeignKey(() => Discussion)
  @Column({ allowNull: false })
  discussionId: string;

  @ForeignKey(() => Comment)
  @Column({ allowNull: true })
  parentCommentId: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @BelongsTo(() => Discussion)
  discussion: Discussion;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Comment, 'parentCommentId')
  parentComment: Comment;

  @HasMany(() => Comment, 'parentCommentId')
  replies: Comment[];

  @HasMany(() => DiscussionLike, 'commentId')
  likes: DiscussionLike[];
}
