import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HashtagService } from './hashtag.service';
import { CreateHashtagInput } from './dto/create-hashtag.input';
import { GetPaginatedFilter } from 'src/utils/type';
import { getPaginationFilters } from 'src/utils/helper';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver('Hashtag')
export class HashtagResolver {
  constructor(private readonly hashtagService: HashtagService) {}

  @Mutation('createHashtag')
  create(@Args('createHashtagInput') createHashtagInput: CreateHashtagInput) {
    return this.hashtagService.create(createHashtagInput);
  }

  @Query('getAllHashtags')
  async getAllHashtags(@Args('filter') filter: GetPaginatedFilter) {
    try {
      const { offset, limit, createdAtOrder } = getPaginationFilters(filter);

      const { total, rows } = await this.hashtagService.findAndCountAll(
        {},
        {
          order: [['createdAt', createdAtOrder]],
          offset,
          limit,
        },
      );

      return {
        total,
        offset,
        limit,
        discussions: rows,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation('removeHashtag')
  remove(@Args('id') id: string) {
    return this.hashtagService.delete({ id });
  }
}
