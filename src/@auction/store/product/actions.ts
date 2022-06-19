import {CreateProductSchema, UpdateProductSchema} from "../../api";

export class GetAllProducts {
  public static readonly type: string = '[Product] get all products';
  constructor(public page_number: number) {
  }
}

export class GetSingleProduct {
  public static readonly type: string = '[Product] get single product';
  constructor(public guid: string) {
  }
}

export class UpdateProduct {
  public static readonly type: string = '[Product] update product';
  constructor(public guid: string, public payload: UpdateProductSchema) {
  }
}

export class DeleteProduct {
  public static readonly type: string = '[Product] delete product';
  constructor(public guid: string) {
  }
}

export class CreateProduct {
  public static readonly type: string = '[Product] create product';
  constructor(public payload: CreateProductSchema) {
  }
}
