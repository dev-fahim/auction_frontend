import {Component, OnInit} from '@angular/core';
import {ProductSchema, ProductsService, ProfileSchema} from "../../../../../@auction/api";
import {finalize, Observable, Subscription} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {ActivatedRoute, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {ProfileState} from "../../../../../@auction/store/profile/state";
import {GetProfile} from "../../../../../@auction/store/profile/actions";
import {GetAllProducts} from "../../../../../@auction/store/product/actions";
import {ProductState} from "../../../../../@auction/store/product/state";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  currentPage = 1;
  pageSize = 10;

  @Select(ProfileState.profile)
  profile$?: Observable<ProfileSchema>;

  @Select(ProductState.allProducts)
  allProducts$?: Observable<Array<ProductSchema>>

  @Select(ProductState.totalRecords)
  totalRecords?: Observable<number>

  @Select(ProductState.status)
  productStateStatus$?: Observable<string>

  constructor(private productsApiService: ProductsService,
              private msg: NzMessageService,
              private acRoute: ActivatedRoute,
              private router: Router,
              private store: Store) {
  }

  ngOnInit(): void {
    this.acRoute.queryParamMap.subscribe({
      next: (params) => {
        this.currentPage = parseInt(params.get('page') ?? '1');
        if (this.currentPage < 1) this.currentPage = 1;
        this.loadProducts(this.currentPage);
      }
    });
  }

  loadProducts(pageIndex: number): void {
    this.store.dispatch(new GetAllProducts(pageIndex));
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex, sort, filter} = params;
    this.router.navigateByUrl('/main/product/all?page=' + pageIndex).then();
  }

}
