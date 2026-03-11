import { Product } from './product';

export interface ProductsResponse {
  data: Product[];
}
export interface ProductMessageResponse {
  message: string;
  data?: Product;
}
