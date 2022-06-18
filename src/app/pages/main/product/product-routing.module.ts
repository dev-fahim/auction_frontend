import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {ProductAddComponent} from "./product-add/product-add.component";
import {ProductsTableComponent} from "./products-table/products-table.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";

const routes: Routes = [{
  path: '', component: ProductComponent, children: [
    {path: 'all', component: ProductsTableComponent},
    {path: 'add', component: ProductAddComponent},
    {path: 'edit/:guid', component: ProductEditComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
