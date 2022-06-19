import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductSchema, ProductsService, ProfileSchema} from "../../../../../@auction/api";
import {ActivatedRoute} from "@angular/router";
import {finalize, Observable, Subscription} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {Select, Store} from "@ngxs/store";
import {ProfileState} from "../../../../../@auction/store/profile/state";
import {GetProfile} from "../../../../../@auction/store/profile/actions";
import {DeleteProduct, GetSingleProduct} from "../../../../../@auction/store/product/actions";
import {ProductState} from "../../../../../@auction/store/product/state";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit, OnDestroy {
  productSubscription?: Subscription;
  product: ProductSchema | null = null;
  guid: string | null = '';
  permissionLoading = true;

  @Select(ProfileState.profile)
  profile$: Observable<ProfileSchema> | undefined;
  profileSubscription: Subscription | null = null;

  @Select(ProductState.selectedProduct)
  product$?: Observable<ProductSchema>;

  @Select(ProductState.status)
  productStateStatus$?: Observable<string>

  constructor(private acRouter: ActivatedRoute,
              private productService: ProductsService,
              private msg: NzMessageService,
              private store: Store) { }

  ngOnDestroy() {
    this.productSubscription?.unsubscribe();
    this.profileSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.profileSubscription = this.store.dispatch(new GetProfile()).pipe(
      finalize(() => {
        this.permissionLoading = false;
      })
    ).subscribe({
      next: () => {
        this.guid = this.acRouter.snapshot.paramMap.get('guid');
        this.store.dispatch(new GetSingleProduct(this.guid ?? ''));
      }
    });
    this.productSubscription = this.product$?.subscribe({
      next: (val) => this.product = val
    })
  }

  deleteProduct(): void {
    this.store.dispatch(new DeleteProduct(this.guid ?? ''));
  }
}