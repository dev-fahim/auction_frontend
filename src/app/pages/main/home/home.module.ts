import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {PlotlyModule} from "angular-plotly.js";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PlotlyModule,
    NzStatisticModule,
    NzGridModule,
    NzCardModule,
    NzIconModule
  ]
})
export class HomeModule { }
