import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {AuctionSchema, ProfileSchema} from "@auction";
import {
  AuctionClearAuctionObject,
  AuctionGetAuctionObject,
  AuctionPostPlaceBidTransaction,
  AuctionState, ProfileState
} from "@auction/store";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-auction-details-view',
  templateUrl: './auction-details-view.component.html',
  styleUrls: ['./auction-details-view.component.css']
})
export class AuctionDetailsViewComponent implements OnInit, OnDestroy {
  @Select(AuctionState.auction)
  auction?: Observable<AuctionSchema>;

  @Select(AuctionState.loading)
  loading?: Observable<boolean>;

  @Select(ProfileState.profile)
  profile$?: Observable<ProfileSchema>;

  guid?: string;

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.guid = this.activatedRoute.snapshot.paramMap.get('guid') ?? '';
    this.store.dispatch(new AuctionGetAuctionObject(this.guid));
  }

  ngOnDestroy() {
    this.store.dispatch(new AuctionClearAuctionObject());
  }

  onBidPlace(amount: number) {
    this.store.dispatch(new AuctionPostPlaceBidTransaction({
      auction_guid: this.guid ?? '',
      amount: amount
    }));
  }

}
