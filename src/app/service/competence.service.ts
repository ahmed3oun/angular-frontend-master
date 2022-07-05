import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competence } from '../model/competence';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private http: HttpClient) { }

  public getComp(): Observable<Competence[]> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.get<Competence[]>("http://localhost:8080/competence/all" , {headers, responseType:  'json' });   
  }

}
