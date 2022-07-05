import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidat } from '../model/candidat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  private apiServerUrl = environment.apiBaseUrl ;
  constructor( private http: HttpClient ) { }

  public getCandidat(): Observable<any[]> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.get<Candidat[]>("http://localhost:8080/candidat/all" , {headers, responseType:  'json' });    
  }

  addCandidat( candidat: Candidat):Observable<Candidat>{
    let jwt = localStorage.getItem('jwt'); ;
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<Candidat>("http://localhost:8080/candidat/add" ,candidat, {headers:httpHeaders});
  }

  consulterCandidat(id: number): Observable<Candidat> {
    let jwt = localStorage.getItem('jwt');
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Candidat>( `${this.apiServerUrl}/candidat/find/${id}` ,{headers:httpHeaders} );
  }
    
  updateCandidat(candidat :Candidat) : Observable<Candidat>    {
    let jwt = localStorage.getItem('jwt');
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.put<Candidat>("http://localhost:8080/candidat/update", candidat, {headers:httpHeaders});
  }

  deleteCandidat(id : number) {
    let jwt = localStorage.getItem('jwt');
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.delete(`${this.apiServerUrl}/candidat/delete/${id}`,  {headers:httpHeaders});
    }
}
