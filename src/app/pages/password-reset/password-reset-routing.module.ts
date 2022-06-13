import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PasswordResetComponent} from './password-reset.component';
import {EnterEmailComponent} from "./enter-email/enter-email.component";
import {VerifyComponent} from "./verify/verify.component";

const routes: Routes = [
  {
    path: '', component: PasswordResetComponent, children: [
      {path: 'enter-email', component: EnterEmailComponent},
      {path: 'verify', component: VerifyComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetRoutingModule {
}
