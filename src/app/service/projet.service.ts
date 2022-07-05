import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from '../model/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http: HttpClient) { }

  public getProjet(): Observable<Projet[]> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.get<Projet[]>("http://localhost:8080/projet/all" , {headers, responseType:  'json' });   
  }
}
