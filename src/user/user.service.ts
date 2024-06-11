import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.userModel.create(createUserInput);
  }

  findOne(payload = {}, options = {}) {
    return this.userModel.findOne({
      where: payload,
      ...options,
    });
  }

  find(payload = {}, options = {}) {
    return this.userModel.findAll({
      where: payload,
      ...options,
    });
  }

  async update(condition = {}, payload: UpdateUserInput, options = {}) {
    return this.userModel.update(payload, {
      where: condition,
      ...options,
      returning: true,
    });
  }
}
