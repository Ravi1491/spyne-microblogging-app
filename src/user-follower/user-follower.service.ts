import { Injectable } from '@nestjs/common';
import { UserFollower } from './entities/user-follower.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserFollowerInput } from './dto/create-user-follower.input';

@Injectable()
export class UserFollowerService {
  constructor(
    @InjectModel(UserFollower)
    private userFollowerModel: typeof UserFollower,
  ) {}

  create(createUserFollowerInput: CreateUserFollowerInput) {
    return this.userFollowerModel.create(createUserFollowerInput);
  }

  findOne(payload = {}, options = {}) {
    return this.userFollowerModel.findOne({
      where: payload,
      ...options,
    });
  }

  find(payload = {}, options = {}) {
    return this.userFollowerModel.findAll({
      where: payload,
      ...options,
    });
  }

  delete(condition = {}, options = {}) {
    return this.userFollowerModel.destroy({
      where: condition,
      ...options,
    });
  }

  async findAndCountAll(payload = {}, options = {}) {
    const { count, rows } = await this.userFollowerModel.findAndCountAll({
      where: payload,
      ...options,
    });

    return { total: count, rows };
  }
}
