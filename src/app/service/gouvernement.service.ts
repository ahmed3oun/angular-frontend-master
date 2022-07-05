import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GouvernementService {

  constructor(public http : HttpClient) { }

  public getGouvernements(): Observable<any[]> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.get<any[]>("http://localhost:8080/gouvernement/all" 
        , {headers, responseType:  'json' });   
  }
}
