import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditRoutingModule } from './credit-routing.module';
import { CreditComponent } from './credit.component';
import { CreateTopUpRequestComponent } from './create-top-up-request/create-top-up-request.component';
import { TopUpRequestListViewComponent } from './top-up-request-list-view/top-up-request-list-view.component';
import { TransactionListViewComponent } from './transaction-list-view/transaction-list-view.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzResultModule} from "ng-zorro-antd/result";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CreditComponent,
    CreateTopUpRequestComponent,
    TopUpRequestListViewComponent,
    TransactionListViewComponent
  ],
  imports: [
    CommonModule,
    CreditRoutingModule,
    NzPageHeaderModule,
    NzSkeletonModule,
    NzResultModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzInputNumberModule,
    FormsModule
  ]
})
export class CreditModule { }
