import { getCookie, setCookie } from './cookies';
import { HttpHeaders } from '@angular/common/http';

export const AUTH_TOKEN_KEY = 'auth-token';

const AUTH_TOKEN: string = getCookie(AUTH_TOKEN_KEY);
const BR: string = getCookie('BR');

let basicHeaders: HttpHeaders = new HttpHeaders({});
if (AUTH_TOKEN) {
  basicHeaders = basicHeaders.set('Authorization', `Bearer ${AUTH_TOKEN}`);
  basicHeaders = basicHeaders.set('BR', BR);
}
basicHeaders = basicHeaders.set('cache-control', 'no-cache');
export const defaultHeaders: HttpHeaders = basicHeaders;

export function overrideAuthToken(authToken: string): void {
  setCookie(AUTH_TOKEN_KEY, authToken);
  defaultHeaders['X-User-Auth'] = authToken;
}
