import { isEmpty, isNil, isNull, isUndefined } from 'lodash';
import { GetPaginatedFilter } from './type';

export const getPaginationFilters = (filters?: GetPaginatedFilter) => ({
  offset: filters?.offset || 0,
  limit: filters?.limit || 10,
  createdAtOrder: filters?.createdAtOrder || 'DESC',
});

export const isNilOrEmpty = (value: any) =>
  isNil(value) ||
  isEmpty(value) ||
  isNull(value) ||
  isNaN(value) ||
  isUndefined(value);

export const isPresent = (value: any) => !isNilOrEmpty(value);
