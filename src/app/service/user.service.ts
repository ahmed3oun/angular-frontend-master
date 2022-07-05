import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { LoginJwtService } from './login-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl ;

  constructor(private http: HttpClient ,
    private loginService : LoginJwtService) { }

  public getUsers(): Observable<User[]> {
    let jwt = localStorage.getItem('jwt'); 
    let tokenStr = 'Bearer '+ jwt ;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization' ,tokenStr) 
    return this.http.get<User[]>("http://localhost:8080/user/all" , {headers, responseType: 'json' });
    
  }

    addUser( user: User):Observable<User>{
    let jwt = localStorage.getItem('jwt'); 
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<User>("http://localhost:8080/user/add" ,user, {headers:httpHeaders});
    }

    updateUserImage(file:File,id:number):Observable<any>{
      let jwt = localStorage.getItem('jwt'); 
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      const formData: FormData = new FormData();
      formData.append('img', file);
      formData.append('user_id', id.toString());
      
      console.log(formData);
      
      return  this.http.put<any>(`http://localhost:8080/user/updateimg`, formData ,{headers : httpHeaders});
      }

  consulterUser(id: number): Observable<any> {
    let jwt = localStorage.getItem('jwt');
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.get<User>( `${this.apiServerUrl}/user/find/${id}` ,{headers:httpHeaders} );
    }
  
  updateUser(user :any) : Observable<any>    {
    let jwt = localStorage.getItem('jwt');
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.put<User>("http://localhost:8080/user/update", user, {headers:httpHeaders});
    }
  
    deleteUser(id : number) {
    let jwt = localStorage.getItem('jwt');
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.delete(`${this.apiServerUrl}/user/delete/${id}`,  {headers:httpHeaders});
    }
  
}