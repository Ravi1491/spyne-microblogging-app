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
import { Comment } from 'src/comment/entities/comment.entity';
import { DiscussionLike } from 'src/discussion-like/entities/discussion-like.entity';
import { User } from 'src/user/entities/user.entity';

@Table({
  underscored: true,
})
export class Discussion extends Model<Discussion> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false })
  text: string;

  @Column({ allowNull: true })
  imageUrl: string;

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

  @HasMany(() => Comment, 'discussionId')
  comments: Comment[];

  @HasMany(() => DiscussionLike, 'discussionId')
  likes: DiscussionLike[];
}
