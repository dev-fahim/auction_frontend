import {CreateProductSchema, SubmitForProposalSchema, UpdateProductSchema} from "../../api";

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

export class RefreshSingleProduct {
  public static readonly type: string = '[Product] refresh single product';
}

export class UnselectSingleProduct {
  public static readonly type: string = '[Product] unselect single product';
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

export class ProductSubmitForProposal {
  public static readonly type: string = '[Product] product submit for proposal';
  constructor(public payload: SubmitForProposalSchema) {
  }
}

export class ProductUploadImage {
  public static readonly type: string = '[Product] product upload image';
  constructor(public file: Blob) {
  }
}

export class ProductDeleteImage {
  public static readonly type: string = '[Product] product delete image';
  constructor(public payload: string) {
  }
}
