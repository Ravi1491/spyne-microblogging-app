import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hashtag } from './entities/hashtag.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectModel(Hashtag)
    private HashtagModel: typeof Hashtag,
  ) {}

  create(createHashtagInput: { name: string }) {
    return this.HashtagModel.create(createHashtagInput);
  }

  findOne(payload = {}, options = {}) {
    return this.HashtagModel.findOne({
      where: payload,
      ...options,
    });
  }

  find(payload = {}, options = {}) {
    return this.HashtagModel.findAll({
      where: payload,
      ...options,
    });
  }

  delete(condition = {}, options = {}) {
    return this.HashtagModel.destroy({
      where: condition,
      ...options,
    });
  }

  async findAndCountAll(payload = {}, options = {}) {
    const { count, rows } = await this.HashtagModel.findAndCountAll({
      where: payload,
      ...options,
    });

    return { total: count, rows };
  }
}
