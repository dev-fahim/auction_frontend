import {AuthenticationService} from "../api";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {BehaviorSubject, catchError, map, Observable, Subject} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const EMAIL_IS_UNIQUE = 'email_is_unique';
const EMAIL_IS_NOT_VALID = 'email_is_not_valid';
const EMAIL_IS_ALREADY_TAKEN = 'email_is_already_taken';

export class UniqueEmailValidator {
  static createValidator(userService: AuthenticationService, msg: NzMessageService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (validateEmail(control.value))
        return userService
          .userProfileApiViewsCheckEmail({email: control.value})
          .pipe(
            map(
              (res) => {
                if (res.msg === EMAIL_IS_ALREADY_TAKEN) {
                  return {emailNotUnique: true};
                }
                return {};
              }
            ),
            catchError(e => {
              msg.warning('Something went wrong');
              throw e;
            })
          );
      else return new BehaviorSubject({})
    };
  }
}
