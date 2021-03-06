import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CompList {
  company_name: string;
  email: string;
  address: string;
  phone_number: string;
  status: string;
  latitude: string;
  longitude: string;
}

export interface UserList {
  id:number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  CompanyId: number;
  RoleId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  url = "https://final-nodes-app.herokuapp.com";

  constructor(private http: HttpClient) { }

  createCompany(data: any){
    return this.http.post(`${this.url}/public/company`, data)
  }

  getCompany(){
    return this.http.get(`${this.url}/public/getCompany`)
  }

  updateCompany(id: any, data: any) {
    return this.http.put(`${this.url}/public/updatecompany/${id}`,data);
  }

  getCompanyById(id:number) {
    return this.http.get(`${this.url}/public/getCompanyById/${id}`);
  }
}
