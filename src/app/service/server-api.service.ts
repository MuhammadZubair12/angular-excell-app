import isArray from 'lodash/isArray';
import clone from 'lodash/clone';
import keys from 'lodash/keys';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CustomHttpParamCodec } from './custom-http-param-codec.service';
import { defaultHeaders } from '../lib/http-headers';

export interface IOptions {
  params: HttpParams;
  authRequired?: boolean;
}

export interface IErrorResponse {
  error: string;
  message: string;
  status?: number;
}

export interface IUpdateResponseServer {
  result: string;
  message?: string;
}


export interface RequestOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body' | undefined;
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json' | undefined;
  withCredentials?: boolean;
}

export interface IPagination {
  pageNo: number;
  total: number;
  perPage: number;
}

@Injectable()
export class ServerApiService {

  public API_VER_DP = '';

  constructor(
    private http: HttpClient,
    private customHttpParamCodec: CustomHttpParamCodec,
  ) { }

  public get<T>(endpointUrl: string, options: IOptions = { params: new HttpParams() }, authRequired = true) {
    let params: HttpParams = new HttpParams();
    if (options) {
      params = options.params ? options.params : params;
    }
    endpointUrl = `${authRequired ? 'private' : 'public'}/${endpointUrl}`;
    return this.http.get<T>(endpointUrl, this.getRequestOptions('get', params, authRequired));
  }

  public post<T>(endpointUrl: string, body: any, params = new HttpParams(), authRequired = true, isFormData = false) {
    endpointUrl = `${authRequired ? 'private' : 'public'}/${endpointUrl}`;
    return this.http
      .post<T>(endpointUrl, isFormData ? body : JSON.stringify(body), this.getRequestOptions('post', params, authRequired, isFormData))
      ;
  }

  public put<T>(endpointUrl: string, body: any, params = new HttpParams()) {
    endpointUrl = `private/${endpointUrl}`;
    return this.http
      .put<T>(endpointUrl, JSON.stringify(body), this.getRequestOptions('put', params, true))
      ;
  }

  public delete(endpointUrl: string) {
    endpointUrl = `private/${endpointUrl}`;
    return this.http
      .delete(endpointUrl, this.getRequestOptions('delete', undefined, true))
      ;
  }

  private getHeaders(headers = new HttpHeaders()): HttpHeaders {
    const defaults: HttpHeaders = clone(headers);
    return defaults;
  }

  private getQueryParams(params: HttpParams): HttpParams {
    let searchParams: HttpParams = new HttpParams({ encoder: this.customHttpParamCodec });
    keys(params).forEach(key => {
      const val: string = params[key];
      if (isArray(val)) {
        key = `${key}[]`;
        for (const v of val) { searchParams = searchParams.append(key, v); }
      } else { searchParams = searchParams.set(key, val); }
    });
    return searchParams;
  }

  private getRequestOptions(methodType: string, params: HttpParams, authRequired: boolean = false, isFormData = false): RequestOptions {
    let headers: HttpHeaders = new HttpHeaders();
    if (isFormData) {
      headers = new HttpHeaders();
      headers = headers.set('Ignore-Content-Type', 'true');
    } else {
      headers = authRequired ? this.getHeaders(defaultHeaders) : headers;
    }
    return {
      observe: 'response' as 'body',
      headers,
      params: this.getQueryParams(params),
    };
  }

}
