import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
