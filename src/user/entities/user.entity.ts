import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Comment } from 'src/comment/entities/comment.entity';
import { DiscussionLike } from 'src/discussion-like/entities/discussion-like.entity';
import { Discussion } from 'src/discussion/entities/discussion.entity';
import { UserFollower } from 'src/user-follower/entities/user-follower.entity';

@Table({
  underscored: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false })
  mobileNumber: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @HasMany(() => Discussion, 'userId')
  discussions: Discussion[];

  @HasMany(() => UserFollower, 'followerId')
  followers: UserFollower[];

  @HasMany(() => UserFollower, 'followingId')
  followings: UserFollower[];

  @HasMany(() => Comment, 'userId')
  comments: Comment[];

  @HasMany(() => DiscussionLike, 'userId')
  likes: DiscussionLike[];
}
