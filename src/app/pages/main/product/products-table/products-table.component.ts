import {Component, OnInit} from '@angular/core';
import {ProductListSchema, ProductSchema, ProductsService, ProfileSchema} from "../../../../../@auction/api";
import {catchError, finalize, Observable, Subscription} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {CURRENCY_SIGN} from "../../../../../@auction/contants";
import {ActivatedRoute, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {ProfileState} from "../../../../../@auction/store/profile/state";
import {GetProfile} from "../../../../../@auction/store/profile/actions";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  currency = CURRENCY_SIGN;

  productSubscription?: Subscription;

  products?: ProductListSchema;
  currentPage = 1;
  pageSize = 10;
  listOfProducts: Array<ProductSchema> = [];
  isLoading = true;
  permissionLoading = true;

  @Select(ProfileState.profile)
  profile$: Observable<ProfileSchema> | undefined;
  profileSubscription: Subscription | null = null;

  constructor(private productsApiService: ProductsService,
              private msg: NzMessageService,
              private acRoute: ActivatedRoute,
              private router: Router,
              private store: Store) {
  }

  ngOnInit(): void {
    this.profileSubscription = this.store.dispatch(new GetProfile()).pipe(
      finalize(() => {
        finalize(() => {
          this.permissionLoading = false;
          this.isLoading = true;
          this.profileSubscription?.unsubscribe();
        })
      })
    ).subscribe({
      next: (v) => {
        // TODO: check if user has permission then call api
        this.acRoute.queryParamMap.subscribe({
          next: (params) => {
            this.currentPage = parseInt(params.get('page') ?? '1');
            if (this.currentPage < 1) this.currentPage = 1;
            this.loadDataFromServer(this.currentPage, this.pageSize, null, null, []);
          }
        });
      }
    });
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.isLoading = true;
    this.productSubscription = this.productsApiService.productApiViewsGetAllProducts(pageIndex).pipe(
      catchError(e => {
          this.msg.warning('Something went wrong');
          throw e;
        }
      ),
      finalize(() => {
        this.isLoading = false;
        this.productSubscription?.unsubscribe();
      })
    ).subscribe({
      next: (res) => {
        this.products = res;
        this.listOfProducts = this.products.data;
      },
      error: (e) => {
        this.msg.warning('Something went wrong');
      }
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex, sort, filter} = params;
    this.router.navigateByUrl('/main/product/all?page=' + pageIndex).then();
  }

}
