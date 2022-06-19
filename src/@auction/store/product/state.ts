import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {ProductStateModel} from "./model";
import {ProductSchema, ProductsService} from "../../api";
import {
  CreateProduct,
  DeleteProduct,
  GetAllProducts,
  GetSingleProduct,
  ProductSubmitForProposal,
  UpdateProduct
} from "./actions";
import {finalize, tap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {Navigate} from "@ngxs/router-plugin";
import produce from "immer";

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    products: null,
    selectedProduct: null,
    status: "empty"
  }
})
@Injectable()
export class ProductState {
  constructor(private productService: ProductsService,
              private msg: NzMessageService,
              private store: Store) {
  }

  @Selector()
  static allProducts(state: ProductStateModel): Array<ProductSchema> {
    console.log(state.products!.data)
    return state.products!.data;
  }

  @Selector()
  static selectedProduct(state: ProductStateModel): ProductSchema {
    return state.selectedProduct!;
  }

  @Selector()
  static totalRecords(state: ProductStateModel): number {
    return state.products?.count!;
  }

  @Selector()
  static status(state: ProductStateModel): string {
    return state.status;
  }

  @Action(GetAllProducts)
  getAllProducts(ctx: StateContext<ProductStateModel>, action: GetAllProducts) {
    const state = ctx.getState();
    this.setLoading(ctx);
    return this.productService.productApiViewsGetAllProducts(action.page_number).pipe(
      tap({
        next: (res) => {
          ctx.setState(produce<ProductStateModel>(state, (draft) => {
            draft.products = res;
          }));
          this.setLoaded(ctx);
        },
        error: () => {
          this.msg.warning('Error while getting all products');
          this.setError(ctx);
        }
      })
    );
  }

  @Action(CreateProduct)
  createProduct(ctx: StateContext<ProductStateModel>, action: CreateProduct) {
    const state = ctx.getState();
    this.setLoading(ctx);
    const loadingMsg = this.msg.loading('Deleting product...', {nzDuration: 0}).messageId;
    return this.productService.productApiViewsCreateProduct(action.payload).pipe(
      tap({
        next: (res) => {
          ctx.setState(produce<ProductStateModel>(state, (draft) => {
            draft.products!.data = [res, ...draft.products!.data];
            draft.selectedProduct = res;
          }));
          this.setLoaded(ctx);
          this.store.dispatch(new Navigate(['/main', 'product', 'edit', res.guid]))
        },
        error: () => {
          this.msg.warning('Error while adding new product');
          this.setError(ctx);
        }
      }),
      finalize(() => {
        this.msg.remove(loadingMsg);
      })
    );
  }

  @Action(GetSingleProduct)
  getSingleProduct(ctx: StateContext<ProductStateModel>, action: GetSingleProduct) {
    const state = ctx.getState();
    this.setLoading(ctx);
    return this.productService.productApiViewsGetProductObject(action.guid).pipe(
      tap({
        next: (res) => {
          ctx.setState(produce<ProductStateModel>(state, (draft) => {
            draft.selectedProduct = res;
          }));
          this.setLoaded(ctx);
        },
        error: () => {
          this.msg.warning('Error while getting product');
          this.setError(ctx);
        }
      })
    );
  }

  @Action(UpdateProduct)
  updateProduct(ctx: StateContext<ProductStateModel>, action: UpdateProduct) {
    const state = ctx.getState();
    this.setLoading(ctx);
    const loadingMsg = this.msg.loading('Please wait...', {nzDuration: 0}).messageId;
    return this.productService.productApiViewsUpdateProduct(action.guid, action.payload).pipe(
      tap({
        next: (res) => {
          ctx.setState(produce<ProductStateModel>(state, (draft) => {
            draft.selectedProduct = res;
          }));
          this.setLoaded(ctx);
          this.store.dispatch(new Navigate(['/main', 'product', 'edit', res.guid]))
        },
        error: () => {
          this.msg.warning('Error while updating product');
          this.setError(ctx);
        }
      }),
      finalize(() => {
        this.msg.remove(loadingMsg);
      })
    );
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductStateModel>, action: DeleteProduct) {
    const state = ctx.getState();
    this.setLoading(ctx);
    const loadingMsg = this.msg.loading('Deleting product...', {nzDuration: 0}).messageId;
    return this.productService.productApiViewsDeleteProduct(action.guid).pipe(
      tap({
        next: (res) => {
          ctx.setState(produce<ProductStateModel>(state, (draft) => {
            draft.products!.data = draft.products!.data.filter((val) => val.guid != action.guid);
          }));
          this.setLoaded(ctx);
          this.store.dispatch(new Navigate(['/main', 'product', 'all']))
        },
        error: () => {
          this.msg.warning('Error while deleting product');
          this.setError(ctx);
        }
      }),
      finalize(() => {
        this.msg.remove(loadingMsg);
      })
    );
  }

  @Action(ProductSubmitForProposal)
  productSubmitForProposal(ctx: StateContext<ProductStateModel>, action: ProductSubmitForProposal) {
    const state = ctx.getState();
    this.setLoading(ctx);
    const loadingMsg = this.msg.loading('Submitting...', {nzDuration: 0}).messageId;
    return this.productService.productApiViewsProductSubmitForProposal(action.payload).pipe(
      tap({
        next: (res) => {
          ctx.setState(produce<ProductStateModel>(state, (draft) => {
            draft.selectedProduct = res;
          }));
          this.setLoaded(ctx);
          this.store.dispatch(new Navigate(['/main', 'product', 'edit', res.guid]))
        },
        error: () => {
          this.msg.warning('Error while submitting for proposal');
          this.setError(ctx);
        }
      }),
      finalize(() => {
        this.msg.remove(loadingMsg);
      })
    );
  }

  setLoading(ctx: StateContext<ProductStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      status: 'loading'
    });
  }

  setLoaded(ctx: StateContext<ProductStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      status: 'loaded'
    });
  }

  setError(ctx: StateContext<ProductStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      status: 'error'
    });
  }
}
