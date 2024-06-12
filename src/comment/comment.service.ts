import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  create(createCommentInput: CreateCommentInput) {
    return this.commentModel.create(createCommentInput);
  }

  findOne(payload = {}, options = {}): Promise<Comment> {
    return this.commentModel.findOne({
      where: payload,
      ...options,
    });
  }

  find(payload = {}, options = {}) {
    return this.commentModel.findAll({
      where: payload,
      ...options,
    });
  }

  delete(condition = {}, options = {}) {
    return this.commentModel.destroy({
      where: condition,
      ...options,
    });
  }

  async update(condition = {}, payload: UpdateCommentInput, options = {}) {
    return this.commentModel.update(payload, {
      where: condition,
      ...options,
      returning: true,
    });
  }

  async findAndCountAll(payload = {}, options = {}) {
    const { count, rows } = await this.commentModel.findAndCountAll({
      where: payload,
      ...options,
    });

    return { total: count, rows };
  }
}
