import { GetPaginatedFilter } from './type';

export const getPaginationFilters = (filters?: GetPaginatedFilter) => ({
  offset: filters?.offset || 0,
  limit: filters?.limit || 10,
  createdAtOrder: filters?.createdAtOrder || 'DESC',
});
