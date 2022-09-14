import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductComponent} from './product.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {ProductsTableComponent} from './products-table/products-table.component';
import {ProductDescriptionComponent} from './product-description/product-description.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {IconsProviderModule} from "../../../icons-provider.module";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {ProductAddComponent} from "./product-add/product-add.component";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzResultModule} from "ng-zorro-antd/result";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {ProductFormComponent} from './product-form/product-form.component';
import {ProductUpdateComponent} from './product-description/product-update/product-update.component';
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzImageModule} from "ng-zorro-antd/image";


@NgModule({
  declarations: [
    ProductComponent,
    ProductsTableComponent,
    ProductDescriptionComponent,
    ProductAddComponent,
    ProductFormComponent,
    ProductUpdateComponent
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
	FormsModule,
	NzDividerModule,
	NzInputNumberModule,
	NzPopconfirmModule,
	NzAlertModule,
	NzSkeletonModule,
	NzUploadModule,
	NzModalModule,
	NzImageModule
  ],
})
export class ProductModule {
}
