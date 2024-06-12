import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DiscussionHashtag } from './entities/discussion-hashtag.entity';

@Injectable()
export class DiscussionHashTagService {
  constructor(
    @InjectModel(DiscussionHashtag)
    private DiscussionHashtagModel: typeof DiscussionHashtag,
  ) {}

  create(createDiscussionHashtagInput: {
    discussionId: string;
    hashtagId: string;
  }) {
    return this.DiscussionHashtagModel.create(createDiscussionHashtagInput);
  }

  findOne(payload = {}, options = {}) {
    return this.DiscussionHashtagModel.findOne({
      where: payload,
      ...options,
    });
  }

  find(payload = {}, options = {}) {
    return this.DiscussionHashtagModel.findAll({
      where: payload,
      ...options,
    });
  }

  delete(condition = {}, options = {}) {
    return this.DiscussionHashtagModel.destroy({
      where: condition,
      ...options,
    });
  }

  async findAndCountAll(payload = {}, options = {}) {
    const { count, rows } = await this.DiscussionHashtagModel.findAndCountAll({
      where: payload,
      ...options,
    });

    return { total: count, rows };
  }
}
