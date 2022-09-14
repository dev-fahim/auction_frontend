import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {AuthenticationService, PasswordResetService} from "../../../../../@auction/api";

@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.css']
})
export class EnterEmailComponent implements OnInit {
  isLoading = false;
  loginForm!: FormGroup;
  emailSent = false;

  constructor(private fb: FormBuilder,
              private passwordResetService: PasswordResetService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.passwordResetService.userProfileApiViewsRequestPasswordResetToken({
        email: this.loginForm.controls['email'].value,
      }).pipe(
        finalize(() => {
          this.emailSent = true;
          this.isLoading = false;
        })
      ).subscribe({
        next: (res) => {
        },
        error: (error) => {

        },
      });
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

}
