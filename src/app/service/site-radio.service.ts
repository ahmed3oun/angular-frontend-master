import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteRadioService {

  
  constructor( private http: HttpClient ) { }

  public getsiteRadio(): Observable<any[]> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.get<any[]>("http://localhost:8080/siteradio/all" , {headers, responseType:  'json' });    
  }

  addsiteRadio( siteRadio: any):Observable<any>{
    let jwt = localStorage.getItem('jwt'); ;
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<any>("http://localhost:8080/siteradio/add" ,siteRadio, {headers:httpHeaders});
  }

  getSiteRadioById(id : Number | undefined): Observable<any> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr)
    return this.http.get<any>(`http://localhost:8080/siteradio/find/${id}`,{headers, responseType:  'json' })
  }
  
    
  updateSiteRadio(site :any) : Observable<any>    {
    let jwt = localStorage.getItem('jwt');
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.put<any>(`http://localhost:8080/siteradio/update`, site, {headers:httpHeaders});
  }

  deleteSiteRadio(id : number) {
    let jwt = localStorage.getItem('jwt');
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.delete(`http://localhost:8080/siteradio/delete/${id}`,  {headers:httpHeaders});
    }
}
