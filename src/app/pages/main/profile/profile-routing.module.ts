import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import {AccountStatusComponent} from "./account-status/account-status.component";

const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      {path: 's', component: AccountStatusComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
