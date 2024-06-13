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
import { User } from 'src/user/entities/user.entity';

@Table({
  underscored: true,
})
export class UserFollower extends Model<UserFollower> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  followerId: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  followingId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @BelongsTo(() => User)
  follower: User;

  @BelongsTo(() => User)
  following: User;
}
