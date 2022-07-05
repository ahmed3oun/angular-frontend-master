import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Role } from '../model/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiServerUrl = '' ;

  constructor(private http: HttpClient ) { }

  public getRoles(): Observable<Role[]> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.get<Role[]>("http://localhost:8080/role/all" , {headers, responseType: 'json' });   
  }
  
}
