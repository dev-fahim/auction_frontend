import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalMenuItemComponent } from './vertical-menu-item/vertical-menu-item.component';
import {NzIconModule} from "ng-zorro-antd/icon";



@NgModule({
  declarations: [
    VerticalMenuItemComponent
  ],
  exports: [
    VerticalMenuItemComponent
  ],
  imports: [
    CommonModule,
    NzIconModule
  ]
})
export class SharedComponentsModule { }
