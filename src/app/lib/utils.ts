import { FormGroup } from '@angular/forms';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

type TERMS_TYPE = 'tos' | 'privacy';

export function selfValidate(formGroup: FormGroup): void {
  // tslint:disable-next-line: forin
  for (const i in formGroup.controls) {
    formGroup.controls[i].markAsDirty();
    formGroup.controls[i].updateValueAndValidity();
  }
}

export function extractResponseBody(res: any): any {
  return res.body;
}

export function getTermsUrl(type: TERMS_TYPE): string {
  const { API_URL } = environment;
  return `http://${API_URL}/${type}`;
}

export function parseError(res: HttpErrorResponse): any {
  return res.error.error[0];
}

export function round(num: any, decimals = 2): number {
  return  Number(Number(num).toFixed(decimals));
}


export function getError(fg: FormGroup, controlName: string, label: string): string {
  if (!fg || !fg.get(controlName)) { return; }
  const error = fg.get(controlName).errors;
  if (error) {
    if (error.required) {
      return `${label} is required`;
    } else if (error.maxlength) {
      return `Word limit exceeded`;
    } else if (error.invalid || error.email) {
      return `Please enter a valid ${label}`;
    }
  }
}

export function serverDateOnlyFormat(): string {
  const DATE_FORMAT = 'YYYY-MM-DD';
  return DATE_FORMAT;
}
