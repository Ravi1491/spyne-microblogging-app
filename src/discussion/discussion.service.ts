import { Injectable } from '@nestjs/common';
import { CreateDiscussionInput } from './dto/create-discussion.input';
import { Discussion } from './entities/discussion.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateDiscussionInput } from './dto/update-discussion.input';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectModel(Discussion)
    private DiscussionModel: typeof Discussion,
  ) {}

  create(createDiscussionInput: CreateDiscussionInput) {
    return this.DiscussionModel.create(createDiscussionInput);
  }

  findOne(payload = {}, options = {}) {
    return this.DiscussionModel.findOne({
      where: payload,
      ...options,
    });
  }

  find(payload = {}, options = {}) {
    return this.DiscussionModel.findAll({
      where: payload,
      ...options,
    });
  }

  delete(condition = {}, options = {}) {
    return this.DiscussionModel.destroy({
      where: condition,
      ...options,
    });
  }

  async update(condition = {}, payload: UpdateDiscussionInput, options = {}) {
    return this.DiscussionModel.update(payload, {
      where: condition,
      ...options,
      returning: true,
    });
  }

  async findAndCountAll(payload = {}, options = {}) {
    const { count, rows } = await this.DiscussionModel.findAndCountAll({
      where: payload,
      ...options,
    });

    return { total: count, rows };
  }
}
