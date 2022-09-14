import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {
  CreditgetTopUpRequestList,
  CreditState,
  ProfileState
} from "@auction/store";
import {Observable} from "rxjs";
import {ProfileSchema, TopUpRequestListSchema} from "@auction";
import {ActivatedRoute, Router} from "@angular/router";
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Component({
  selector: 'app-top-up-request-list-view',
  templateUrl: './top-up-request-list-view.component.html',
  styleUrls: ['./top-up-request-list-view.component.css']
})
export class TopUpRequestListViewComponent implements OnInit {
  currentPage = 1;

  @Select(CreditState.topUps)
  topUps?: Observable<TopUpRequestListSchema>;

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
    this.store.dispatch(new CreditgetTopUpRequestList(pageIndex));
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex, sort, filter} = params;
    this.router.navigateByUrl('/main/c/s/r?page=' + pageIndex).then();
  }

}
