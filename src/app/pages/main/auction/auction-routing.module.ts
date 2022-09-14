import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionComponent } from './auction.component';
import {AuctionListViewComponent} from "./auction-list-view/auction-list-view.component";
import {AuctionDetailsViewComponent} from "./auction-details-view/auction-details-view.component";

const routes: Routes = [{ path: '', component: AuctionComponent , children: [
    {path: 'all', component: AuctionListViewComponent},
    {path: ':guid', component: AuctionDetailsViewComponent},
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }
