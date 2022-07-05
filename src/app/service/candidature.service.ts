import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidature } from '../model/candidature';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  private apiServerUrl = environment.apiBaseUrl ;
  constructor(private http: HttpClient  ) { }

  public getCandidature(): Observable<Candidature[]> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.get<Candidature[]>("http://localhost:8080/candidature/all" , {headers, responseType:  'json' });    
  }

  addCandidature( candidature: Candidature):Observable<Candidature>{
    let jwt = localStorage.getItem('jwt'); 
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<Candidature>("http://localhost:8080/candidature/add" ,candidature, {headers:httpHeaders});
    }

  deleteCandidature(id : number) {
    let jwt = localStorage.getItem('jwt');
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.delete(`${this.apiServerUrl}/candidature/delete/${id}`,  {headers:httpHeaders});
    }
  
  currentCandidature(id: number): Observable<Candidature> {
    let jwt = localStorage.getItem('jwt');
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Candidature>( `${this.apiServerUrl}/candidature/find/${id}` ,{headers:httpHeaders} );
    }
  
  updateCandidature(candidature :Candidature) : Observable<Candidature>    {
    let jwt = localStorage.getItem('jwt');
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.put<Candidature>("http://localhost:8080/candidature/update", candidature, {headers:httpHeaders});
  }
}
