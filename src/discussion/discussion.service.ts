import { Injectable } from '@nestjs/common';
import { CreateDiscussionInput } from './dto/create-discussion.input';
import { Discussion } from './entities/discussion.entity';
import { InjectModel } from '@nestjs/sequelize';

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

  async findAndCountAll(payload = {}, options = {}) {
    const { count, rows } = await this.DiscussionModel.findAndCountAll({
      where: payload,
      ...options,
    });

    return { total: count, rows };
  }
}
