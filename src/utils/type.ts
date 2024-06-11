import { Order } from './enum';

export interface GetPaginatedFilter {
  offset?: number;
  limit?: number;
  createdAtOrder?: Order;
}
