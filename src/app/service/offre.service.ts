import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Offre } from '../model/offre';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private apiServerUrl = environment.apiBaseUrl ;
  constructor(private http: HttpClient ) { }

  public getOffre(): Observable<Offre[]> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.get<Offre[]>("http://localhost:8080/offre/all" , {headers, responseType:  'json' });
    
  }

  addOffre( offre: Offre):Observable<Offre>{
    let jwt = localStorage.getItem('jwt'); ;
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<Offre>("http://localhost:8080/offre/add" ,offre, {headers:httpHeaders});
    }
  
  consulterOffre(id: number): Observable<Offre> {
    let jwt = localStorage.getItem('jwt');
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Offre>( `${this.apiServerUrl}/offre/find/${id}` ,{headers:httpHeaders} );
    }
      
    updateOffre(offre :Offre) : Observable<Offre>    {
      let jwt = localStorage.getItem('jwt');
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.put<Offre>("http://localhost:8080/offre/update", offre, {headers:httpHeaders});
    }
  
    deleteOffre(id : number) {
      let jwt = localStorage.getItem('jwt');
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
        return this.http.delete(`${this.apiServerUrl}/offre/delete/${id}`,  {headers:httpHeaders});
      }
      
}
