import {ProductDetailsSchema, ProductListSchema} from "../../api";
import {NzUploadFile} from "ng-zorro-antd/upload";

export interface ProductStateModel {
  products: ProductListSchema | null;
  selectedProduct: ProductDetailsSchema | null;
  images: NzUploadFile[];
  status: 'empty' | 'pending' | 'loading' | 'loaded' | 'error'
}
