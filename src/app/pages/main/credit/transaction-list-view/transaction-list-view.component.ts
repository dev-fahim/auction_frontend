import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {CreditGetTransactionList, CreditState, GetAllProducts, ProfileState} from "@auction/store";
import {Observable} from "rxjs";
import {CreditTransactionListSchema, ProfileSchema} from "@auction/api";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-transaction-list-view',
  templateUrl: './transaction-list-view.component.html',
  styleUrls: ['./transaction-list-view.component.css']
})
export class TransactionListViewComponent implements OnInit {
  currentPage = 1;

  @Select(CreditState.transactions)
  transactions?: Observable<CreditTransactionListSchema>;

  @Select(ProfileState.profile)
  profile$?: Observable<ProfileSchema>;

  constructor(private store: Store, private acRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.acRoute.queryParamMap.subscribe({
      next: (params) => {
        this.currentPage = parseInt(params.get('page') ?? '1');
        if (this.currentPage < 1) this.currentPage = 1;
        this.loadTransactions(this.currentPage);
      }
    });
  }

  loadTransactions(pageIndex: number): void {
    this.store.dispatch(new CreditGetTransactionList(pageIndex));
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex, sort, filter} = params;
    this.router.navigateByUrl('/main/c/s/t?page=' + pageIndex).then();
  }

}
