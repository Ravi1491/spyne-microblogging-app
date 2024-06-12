import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
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

  @Column({ allowNull: false })
  discussionId: string;

  @Column({ allowNull: true })
  parentCommentId: string;

  @Column({ allowNull: false })
  userId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
