import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  err:number = 0;
  user = new User();
  

  constructor(private service: LoginJwtService ,
    public router: Router) { }

  ngOnInit(): void {
   
  }
  onLoggedin()
  {
    this.service.login(this.user).subscribe((data) => {
      
     //let jwToken = data.headers.get('Authorization');
     console.log("email user"+this.user.email)
     console.log("email user"+data.email)
      this.service.saveToken(data);
     console.log("user" +data)
      this.router.navigate(['/menu']);              
    },(err)=>{   this.err = 1;

});

 }
  

}


