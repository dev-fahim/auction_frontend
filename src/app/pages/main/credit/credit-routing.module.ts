import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreditComponent} from './credit.component';
import {TransactionListViewComponent} from "./transaction-list-view/transaction-list-view.component";
import {CreateTopUpRequestComponent} from "./create-top-up-request/create-top-up-request.component";

const routes: Routes = [
  {
    path: 's', component: CreditComponent, children: [
      { path: 't', component: TransactionListViewComponent },
      {path: 'r', component: CreateTopUpRequestComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditRoutingModule {
}
