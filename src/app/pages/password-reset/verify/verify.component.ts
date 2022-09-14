import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordResetService} from "../../../../../@auction/api";
import {finalize} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordConfirmValidator} from "../../../../../@auction/validators/password-confirm-validator";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  token: string | null = null;
  email: string | null = null;
  resetForm!: FormGroup;

  tokenInValid = false;
  isLoading = false;

  constructor(private acRoute: ActivatedRoute,
              private passwordResetService: PasswordResetService,
              private msg: NzMessageService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: [null, [Validators.required, Validators.min(4)]],
      confirmPassword: [null, [Validators.required, Validators.min(4)]],
    }, {
      validator: PasswordConfirmValidator('password', 'confirmPassword')
    });
    this.resetForm.disable();
    const id = this.msg.loading('Validating link...', {nzDuration: 0}).messageId;
    this.isLoading = true;
    this.token = this.acRoute.snapshot.queryParamMap.get('token');
    this.email = this.acRoute.snapshot.queryParamMap.get('email');
    this.passwordResetService.userProfileApiViewsCheckPasswordResetToken({
      email: this.email ?? '',
      token: this.token ?? ''
    }).pipe(
      finalize(() => {
        this.isLoading = false;
        this.msg.remove(id)
      })
    ).subscribe(
      {
        next: (res) => {
          this.tokenInValid = false;
          this.resetForm.enable();
        },
        error: (res) => {
          this.tokenInValid = true;
          this.msg.error("Invalid signature!", {nzDuration: 0});
        },
      }
    );
  }
  submitForm(): void {
    if (this.resetForm.valid) {
      this.isLoading = true;
      this.passwordResetService.userProfileApiViewsResetPassword({
        email: this.email ?? '',
        password: this.resetForm.controls['password'].value,
        token: this.token ?? ''
      }).pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
          this.msg.success("Password reset successful");
        },
        error: (error) => {
          this.msg.error("Invalid signature.");
        },
      });
    } else {
      Object.values(this.resetForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }
}
