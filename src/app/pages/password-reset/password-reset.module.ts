import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordResetRoutingModule } from './password-reset-routing.module';
import { PasswordResetComponent } from './password-reset.component';
import { EnterEmailComponent } from './enter-email/enter-email.component';
import { VerifyComponent } from './verify/verify.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzAlertModule} from "ng-zorro-antd/alert";


@NgModule({
  declarations: [
    PasswordResetComponent,
    EnterEmailComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    PasswordResetRoutingModule,
    NzInputModule,
    ReactiveFormsModule,
    NzFormModule,
    NzCheckboxModule,
    NzButtonModule,
    NzAlertModule,
  ]
})
export class PasswordResetModule { }
