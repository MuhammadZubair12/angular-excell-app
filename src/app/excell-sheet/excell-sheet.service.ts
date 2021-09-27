import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ExcellSheetService {

  constructor(
    private http: HttpClient
  ) {
    
   }

  createUser(user: any){
    return this.http.post("https://final-nodes-app.herokuapp.com/public/sheet", user)
  }
}
