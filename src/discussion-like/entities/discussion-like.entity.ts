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
import { LikeEntityType, LikeType } from 'src/graphql';

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

  @Column({ allowNull: true })
  discussionId: string;

  @Column({ allowNull: true })
  commentId: string;

  @Column({ allowNull: false })
  userId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
