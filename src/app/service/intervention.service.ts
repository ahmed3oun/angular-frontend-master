import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  private apiServerUrl = environment.apiBaseUrl ;

  constructor(private http : HttpClient) { }

  addIntervention( intervention: any):Observable<any>{
    let jwt = localStorage.getItem('jwt'); ;
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<any>("http://localhost:8080/intervention/add" ,intervention, {headers:httpHeaders});
  }

  public getInterventions(): Observable<any[]> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.get<any[]>("http://localhost:8080/intervention/all" , {headers, responseType:  'json' });    
  }
  public deleteIntervention(id : number): Observable<any> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.delete<any>(`http://localhost:8080/intervention/delete/${id}` , {headers, responseType:  'json' });    
  }


}
