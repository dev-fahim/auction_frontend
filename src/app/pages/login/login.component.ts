import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../@auction/api";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {AuthService} from "../../../@auction/services/auth.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  loginForm!: FormGroup;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private message: NzMessageService,
    private router: Router,
    private auth: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(4)]],
      remember: [true]
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.userProfileApiViewsSignIn({
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
      }).pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe({
        next: (res) => {
          this.auth.login(res.accessToken);
          this.router.navigate(['/main']);
          this.message.success("Welcome " + res.profile.user.first_name + " " + res.profile.user.last_name);
        },
        error: (error) => {
          this.auth.logout();
          this.loginError = true;
          this.message.error("Invalid credentials!");
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
