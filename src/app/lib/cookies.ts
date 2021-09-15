import * as Cookies from 'js-cookie';
import { environment } from '../../environments/environment';

Cookies.defaults.domain = environment.ROOT_URL;

export function getCookie(key: string): string {
  return Cookies.get(key);
}

export function setCookie(key: string, value: string): void {
  return Cookies.set(key, value);
}

export function removeCookie(key: string): void {
  return Cookies.remove(key);
}
