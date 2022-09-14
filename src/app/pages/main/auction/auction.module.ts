import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuctionRoutingModule} from './auction-routing.module';
import {AuctionComponent} from './auction.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {AuctionListComponent} from './shared/auction-list/auction-list.component';
import {NzListModule} from "ng-zorro-antd/list";
import {NzButtonModule} from "ng-zorro-antd/button";
import {IconsProviderModule} from "../../../icons-provider.module";
import {AuctionDetailsComponent} from './shared/auction-details/auction-details.component';
import {AuctionListItemComponent} from './shared/auction-list/auction-list-item/auction-list-item.component';
import {AuctionListViewComponent} from './auction-list-view/auction-list-view.component';
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {AuctionDetailsViewComponent} from './auction-details-view/auction-details-view.component';
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {FormsModule} from "@angular/forms";
import {PlotlyModule} from "angular-plotly.js";

@NgModule({
  declarations: [
    AuctionComponent,
    AuctionListComponent,
    AuctionDetailsComponent,
    AuctionListItemComponent,
    AuctionListViewComponent,
    AuctionDetailsViewComponent
  ],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    NzPageHeaderModule,
    NzListModule,
    NzButtonModule,
    IconsProviderModule,
    NzPaginationModule,
    NzDescriptionsModule,
    NzSkeletonModule,
    NzPopconfirmModule,
    NzInputNumberModule,
    FormsModule,
    PlotlyModule
  ],
  providers: []
})
export class AuctionModule {
}
