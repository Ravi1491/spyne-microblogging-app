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
import { Discussion } from './discussion.entity';
import { Hashtag } from './hashtag.entity';

@Table({
  underscored: true,
})
export class DiscussionHashtag extends Model<DiscussionHashtag> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => Discussion)
  @Column({ allowNull: false })
  discussionId: string;

  @ForeignKey(() => Hashtag)
  @Column({ allowNull: false })
  hashtagId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @BelongsTo(() => Discussion)
  discussion: Discussion;

  @BelongsTo(() => Hashtag)
  hashtag: Hashtag;
}
