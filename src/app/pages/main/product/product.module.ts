import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import { ProductsTableComponent } from './products-table/products-table.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {IconsProviderModule} from "../../../icons-provider.module";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {ProductAddComponent} from "./product-add/product-add.component";
import {NzInputModule} from "ng-zorro-antd/input";
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzResultModule} from "ng-zorro-antd/result";


@NgModule({
  declarations: [
    ProductComponent,
    ProductsTableComponent,
    ProductEditComponent,
    ProductAddComponent
  ],
  imports: [
	CommonModule,
	ProductRoutingModule,
	NzPageHeaderModule,
	IconsProviderModule,
	NzTableModule,
	NzDescriptionsModule,
	NzBadgeModule,
	NzButtonModule,
	NzTypographyModule,
	NzInputModule,
	ReactiveFormsModule,
	NzFormModule,
	NzCheckboxModule,
	NzSelectModule,
	NzDatePickerModule,
	NzResultModule,
  ],
})
export class ProductModule { }
