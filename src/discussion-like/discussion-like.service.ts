import { Injectable } from '@nestjs/common';
import { CreateDiscussionLikeInput } from './dto/create-discussion-like.input';
import { InjectModel } from '@nestjs/sequelize';
import { DiscussionLike } from './entities/discussion-like.entity';
import { CreateCommentLikeInput } from './dto/create-comment-like.input';

@Injectable()
export class DiscussionLikeService {
  constructor(
    @InjectModel(DiscussionLike)
    private DiscussionLikeModel: typeof DiscussionLike,
  ) {}

  create(
    createDiscussionLikeInput:
      | CreateDiscussionLikeInput
      | CreateCommentLikeInput,
  ) {
    return this.DiscussionLikeModel.create(createDiscussionLikeInput);
  }

  findOne(payload = {}, options = {}) {
    return this.DiscussionLikeModel.findOne({
      where: payload,
      ...options,
    });
  }

  find(payload = {}, options = {}) {
    return this.DiscussionLikeModel.findAll({
      where: payload,
      ...options,
    });
  }

  delete(condition = {}, options = {}) {
    return this.DiscussionLikeModel.destroy({
      where: condition,
      ...options,
    });
  }

  async findAndCountAll(payload = {}, options = {}) {
    const { count, rows } = await this.DiscussionLikeModel.findAndCountAll({
      where: payload,
      ...options,
    });

    return { total: count, rows };
  }

  count(payload = {}, options = {}) {
    return this.DiscussionLikeModel.count({
      where: payload,
      ...options,
    });
  }
}
