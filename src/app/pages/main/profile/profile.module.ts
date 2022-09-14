import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import { AccountStatusComponent } from './account-status/account-status.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PasswordChangeComponent } from './password-change/password-change.component';


@NgModule({
  declarations: [
    ProfileComponent,
    AccountStatusComponent,
    EditProfileComponent,
    PasswordChangeComponent
  ],
  imports: [
	CommonModule,
	ProfileRoutingModule,
	NzPageHeaderModule
  ]
})
export class ProfileModule { }
