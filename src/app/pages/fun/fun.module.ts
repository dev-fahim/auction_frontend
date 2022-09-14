import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunRoutingModule } from './fun-routing.module';
import { FunComponent } from './fun.component';


@NgModule({
  declarations: [
    FunComponent
  ],
  imports: [
    CommonModule,
    FunRoutingModule
  ]
})
export class FunModule { }
