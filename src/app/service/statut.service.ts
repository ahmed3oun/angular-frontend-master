import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Statut } from '../model/statut';

@Injectable({
  providedIn: 'root'
})
export class StatutService {

  constructor(private http: HttpClient) { }

  public getStatut(): Observable<Statut[]> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.get<Statut[]>("http://localhost:8080/statut/all" , {headers, responseType: 'json' });   
  }
}
