import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginJwtService {


  apiURL: string = 'http://localhost:8080/app';
  
  token:any;
  public loggedUser:any;
  public isloggedIn: Boolean = false;
  public role:any;
  public helper = new JwtHelperService();
  public username!: string | null ;
  public image!: string | null ;
  public lrole!: string | null ;
  public CurrentToken!: string | null ;
  
      

  constructor(private http:HttpClient , private router: Router) { }

  public login(user : User)
  {
    return this.http.post<User>("http://localhost:8080/app/login" , user , {  responseType:  'json' });
  }

  saveToken(data : any){
    localStorage.setItem('jwt',data.token);
    this.token = data.token;
    localStorage.setItem('role',data.role.nom);
    localStorage.setItem('username' , data.username) ;
    localStorage.setItem('image' , data.imageUrl) ;
    this.isloggedIn = true; 
    this.decodeJWT(); 
  }

  LoadUsername() {   
   this.username=localStorage.getItem('username') ;
   
      return this.username ;       
  }
  
  LoadImage() {   
    this.image=localStorage.getItem('image') ;
       return this.image ; 
   }
   LoadRole() {   
    this.lrole=localStorage.getItem('role') ;
       return this.lrole ; 
   }
  decodeJWT()
  {   if (this.token == undefined)
            return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.role = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
    
  }
 


  loadToken() {
    this.token = localStorage.getItem('jwt');
    this.decodeJWT();
  }

  getToken():string {
    return this.token;
  }
   
  logout() { 
    this.loggedUser = undefined;
    this.token= undefined;
    this.isloggedIn = false;
  
    localStorage.clear() ;
    this.router.navigate(['/login']);
  }

 

  isENGINEER():Boolean{
    this.role = localStorage.getItem('role');
   
        if (this.role == 'ENGINEER' )
          return true ;
        else 
          return false ;      
  }

  isUser():Boolean{
    this.role = localStorage.getItem('role');
        if (this.role == 'USER' )
          return true ;
        else 
          return false ;      
  }

  isManager():Boolean{
    this.role = localStorage.getItem('role');
        if (this.role == 'MANAGER' )
          return true ;
        else 
          return false ;       
}
  isAdmin():boolean{
    this.role = localStorage.getItem('role');
    return this.role == 'ADMIN' ? true : false ;
  }
  ExistToken() {   
    this.CurrentToken=localStorage.getItem('jwt') ;
    
      return this.CurrentToken ;       
  }

  
}
