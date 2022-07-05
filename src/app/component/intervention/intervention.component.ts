import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import { InterventionService } from 'src/app/service/intervention.service';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {

  constructor(public intervService : InterventionService  
        ,private loginService : LoginJwtService, public  router : Router )
   { }

  newIntervention : {option : string ,
                    fullname : string ,
                    observation : string ,
                    date : string ,
                    problem:string } = {
    option: '',
    fullname: '',
    observation: '',
    date: '',
    problem: ''
  } 
  currentToken : any ;

  ngOnInit(): void {
    this.ExistToken();
    
  }
  ExistToken(){
    this.currentToken = this.loginService.ExistToken();
    console.log("load token : "+ this.currentToken)
    if( this.currentToken == null ) 
      this.router.navigate(['login'])
  }
  
  addIntervention(){
    console.log("New Intervention :: ",this.newIntervention);
    
      this.intervService.addIntervention(this.newIntervention).subscribe(res => {
        console.log(res);
        this.router.navigate(['intervention']).then(() => {
          window.location.reload(); 
        });
      }, (err)=>{
        console.log(err);
      });
      
   }

   
  public isIntervention(){
    return localStorage.getItem('role') === 'INTERVENTION'; 
  }

}

