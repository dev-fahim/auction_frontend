import {FormGroup} from '@angular/forms';


export function PasswordConfirmValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['PasswordConfirmValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({PasswordConfirmValidator: true});
    } else {
      matchingControl.setErrors(null);
    }
  }
}
