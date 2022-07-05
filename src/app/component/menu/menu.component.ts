import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
 // styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  

  user = new User();
  cUser = new User();
  username : any ; 
  image : any ;
  role : any ;
  currentToken : any ;
  constructor( private loginService : LoginJwtService , private router : Router) { }

  ngOnInit(): void {
    this.ExistToken();
    this.loadUsename() ; 
    this.loadImage();
    this.loadRole() ;
  }

  ExistToken(){
    this.currentToken = this.loginService.ExistToken();
    console.log("load token : "+ this.currentToken)
    if( this.currentToken == null ) 
      this.router.navigate(['login'])
  }
  
  logout(){
    this.loginService.logout() ;
   }
   
   public isENGINEER(){
    return this.loginService.isENGINEER(); 
  }
  
   public isADMIN(){
    return this.loginService.isAdmin(); 
  }
   public isUSER(){
    return this.loginService.isUser(); 
  }
   public isMANAGER(){
    return this.loginService.isManager(); 
  }
  isIntervention(){
    return localStorage.getItem('role') === 'INTERVENTION'
  }
  loadUsename(){
    this.username =this.loginService.LoadUsername(); 
      return this.username ; 
  }

  loadImage(){
    this.image =this.loginService.LoadImage();
      return this.image 
    
  }

  loadRole(){
    this.role =this.loginService.LoadRole();  
      return this.role ;
  }

  
 }


