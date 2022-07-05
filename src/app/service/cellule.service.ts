import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competence } from '../model/competence';
import { Cellule } from '../model/Cellule';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CelluleService {
private apiServerUrl = environment.apiBaseUrl ;

  constructor(private http: HttpClient) {

   }


  addCellule( cellule: Cellule):Observable<Cellule>{
    let jwt = localStorage.getItem('jwt'); ;
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<Cellule>("http://localhost:8080/cellule/add" ,cellule, {headers:httpHeaders});
  }
  public getCel(): Observable<Cellule[]> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.get<Cellule[]>("http://localhost:8080/cellule/all" , {headers, responseType:  'json' });   
  }
  public getNotUsedCellules(): Observable<Cellule[]> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.get<Cellule[]>("http://localhost:8080/cellule/notUsed" , {headers, responseType:  'json' });   
  }
}