import {ProductListSchema, ProductSchema} from "../../api";

export interface ProductStateModel {
  products: ProductListSchema | null;
  selectedProduct: ProductSchema | null;
  status: 'empty' | 'pending' | 'loading' | 'loaded' | 'error'
}
