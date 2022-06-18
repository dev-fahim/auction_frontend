import { Injectable } from '@angular/core';
import {Action, State, StateContext, Selector} from '@ngxs/store';
import {CategoryStateModel} from "./model";
import {CategorySchema, ProductsService} from "../../api";
import {NzMessageService} from "ng-zorro-antd/message";
import {catchError, finalize, tap} from "rxjs";
import {GetCategories} from "./actions";

@State<CategoryStateModel>({
  name: 'category',
  defaults: {
    categories: {data: []}
  }
})
@Injectable()
export class CategoryState {
  constructor(private productService: ProductsService,
              private msg: NzMessageService) {
  }

  @Selector()
  static categories(state: CategoryStateModel): CategorySchema[] {
    return state.categories.data;
  }

  @Action(GetCategories)
  getProfile(ctx: StateContext<CategoryStateModel>, action: GetCategories) {
    const loadingId = this.msg.loading('Please wait...', {nzDuration: 0}).messageId;
    return this.productService.productApiViewsGetAllCategories().pipe(
      tap({
        next: (res) => {
          const state = ctx.getState();
          ctx.setState({
            ...state,
            categories: res,
          })
        },
        error: (e) => {
          this.msg.warning('Error getting categories');
        }
      }),
      catchError((e) => {
        this.msg.warning('Something went wrong');
        throw e;
      }),
      finalize(() => {
        this.msg.remove(loadingId);
      })
    );
  }
}
