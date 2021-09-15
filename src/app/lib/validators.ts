import keys from 'lodash/keys';
import toNumber from 'lodash/toNumber';
import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { round } from './utils';

export const checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  let pass: string = control.get('password') ? control.get('password').value : '';
  let confirmPass: string = control.get('confirmPass') ? control.get('confirmPass').value : '';

  return pass === confirmPass ? null : { notSame: true }
}

export const isURL: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  const URL_REGEXP = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
  const validURL = URL_REGEXP.test(control.value);
  const isAbsoluteURL = validURL ? control.value.indexOf('https://') > -1 : false;
  return !control.value || isAbsoluteURL ? null : { invalid: true }
}

export const checkIfPasswordIsBlank: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  return control.value.trim().length > 0 ? null : { blank: true };
};

export const customEmail: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !control.value || re.test(String(control.value).toLowerCase()) ? null : { email: true };
}

export const isPhone: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  var re = /^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/;
  return !control.value || re.test(String(control.value).toLowerCase()) ? null : { invalid: true };
}

export const maxWord = (max: number): ValidatorFn => {
  return (control: AbstractControl) => {
    return !control.value || control.value.split(' ').length <= max ? null : { maxlength: true };
  };
};

export const atleastOneScopeSelected: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  const scope: any = control.value;
  const scopeKeys = keys(control.value);
  const selectedScopeKeys = scopeKeys.find((key: string) => {
    return scope[key].enabled;
  });
  return selectedScopeKeys && selectedScopeKeys.length ? null : { invalid: true };
};

export const minMaxCheck: any = (minControl: string, maxControl: string): ValidationErrors => {
  return (formGroup: FormGroup) => {
    const min = formGroup.controls[minControl];
    const max = formGroup.controls[maxControl];
    if (toNumber(min.value) > toNumber(max.value)) {
      min.setErrors({ greaterThanMax: true });
      max.setErrors({ lesserThanMin: true });
      return { invalid: true };
    }
  };
};

export const inMinMax: any = ({min, max}: any): ValidationErrors => {
  return (control: AbstractControl) => {
    const rate = round(Number(control.value));
    return !control.value &&  rate >= min && rate <= max ? null : { invalid: true };
  };
};

