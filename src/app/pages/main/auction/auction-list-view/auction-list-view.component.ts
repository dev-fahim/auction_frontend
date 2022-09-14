import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable, tap} from "rxjs";
import {AuctionListSchema} from "@auction/api";
import {AuctionGetRunningAuctionList, AuctionState} from "@auction/store";

@Component({
  selector: 'app-auction-list-view',
  templateUrl: './auction-list-view.component.html',
  styleUrls: ['./auction-list-view.component.css']
})
export class AuctionListViewComponent implements OnInit {
  @Select(AuctionState.auctions)
  auctions?: Observable<AuctionListSchema>;

  @Select(AuctionState.loading)
  loading?: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new AuctionGetRunningAuctionList(1));
  }

  onPageChange(page: number): void {
    this.store.dispatch(new AuctionGetRunningAuctionList(page)).subscribe({
      next: () => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    });
  }

}
