import { Component, OnInit } from '@angular/core';
import {ProductSchema, ProductsService, ProfileSchema} from "../../../../../@auction/api";
import {ActivatedRoute} from "@angular/router";
import {catchError, finalize, Observable, Subscription} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {Select, Store} from "@ngxs/store";
import {ProfileState} from "../../../../../@auction/store/profile/state";
import {GetProfile} from "../../../../../@auction/store/profile/actions";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  isLoading = false;
  productSubscription: Subscription | null = null;
  product: ProductSchema | null = null;
  guid: string | null = '';
  permissionLoading = true;

  @Select(ProfileState.profile)
  profile$: Observable<ProfileSchema> | undefined;
  profileSubscription: Subscription | null = null;

  constructor(private acRouter: ActivatedRoute,
              private productService: ProductsService,
              private msg: NzMessageService,
              private store: Store) { }

  ngOnInit(): void {
    this.profileSubscription = this.store.dispatch(new GetProfile()).pipe(
      finalize(() => {
        this.permissionLoading = false;
        this.isLoading = true;
        this.profileSubscription?.unsubscribe();
      })
    ).subscribe({
      next: () => {
        // TODO: check if user has permission then call api
        this.guid = this.acRouter.snapshot.paramMap.get('guid');
        this.productSubscription = this.productService.productApiViewsGetProductObject(this.guid ?? '').pipe(
          finalize(() => {
            this.isLoading = false;
          }),
          catchError((e) => {
            this.msg.warning('Something went wrong');
            throw e;
          })
        ).subscribe({
          next: (res) => {
            this.product = res;
          },
          error: (e) => {
            this.msg.error('Product not found');
          }
        });
      }
    });
  }
}
