import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UniqueEmailValidator} from "../../../../@auction/validators/unique-email-validator";
import {AuthenticationService} from "../../../../@auction/api";
import {NzMessageService} from "ng-zorro-antd/message";
import {PasswordConfirmValidator} from "../../../../@auction/validators/password-confirm-validator";
import {finalize} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private msg: NzMessageService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: [null, [Validators.required, Validators.email], [UniqueEmailValidator.createValidator(this.authService, this.msg)]],
      first_name: [null, [Validators.required]],
      last_name: [''],
      user_type: [null],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    }, {
      validator: PasswordConfirmValidator('password', 'confirmPassword')
    });
  }

  submitForm(): void {
    if (this.registrationForm.valid) {
      this.registrationForm.disable();
      const controls = this.registrationForm.controls;
      this.isLoading = true;
      this.authService.userProfileApiViewsSignUp({
        email: controls['email'].value,
        password: controls['password'].value,
        first_name: controls['first_name'].value,
        last_name: controls['last_name'].value,
        is_buyer: controls['user_type'].value === 'BUYER'
      }).pipe(
        finalize(() => {
          this.isLoading = false;
          this.registrationForm.enable();
        })
      ).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
          this.msg.success("Please login to continue.");
        },
        error: (e) => {
          this.msg.error("Something went wrong.");
        }
      });
    } else {
      Object.values(this.registrationForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }
}
