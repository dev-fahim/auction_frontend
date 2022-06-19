import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {ProductAddComponent} from "./product-add/product-add.component";
import {ProductsTableComponent} from "./products-table/products-table.component";
import {ProductDescriptionComponent} from "./product-description/product-description.component";
import {ProductUpdateComponent} from "./product-description/product-update/product-update.component";

const routes: Routes = [{
  path: '', component: ProductComponent, children: [
    {path: 'all', component: ProductsTableComponent},
    {path: 'add', component: ProductAddComponent},
    {path: 'edit/:guid', component: ProductDescriptionComponent},
    {path: 'edit/:guid/update', component: ProductUpdateComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
