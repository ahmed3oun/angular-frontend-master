import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';
import { UserModel } from 'src/app/model/UserModel';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListAdminComponent implements OnInit {
  
  users: any[] = [];
 currentToken : any ;
  constructor(private userService : UserService , private router : Router , private authService : LoginJwtService) { }
  
  ngOnInit() {
    this.ExistToken();
    this.loadUsers();
     }

     isAdmin(){
      return localStorage.getItem('role') === 'ADMIN'
     }
  ExistToken(){
    this.currentToken = this.authService.ExistToken();
    console.log("load token : "+ this.currentToken)
    if( this.currentToken == null ) 
      this.router.navigate(['login'])
  }

  loadUsers(){    
    this.userService.getUsers().subscribe(data=>{  
    this.users = data
      console.log("kk " +this.users)
    }, err=>{
      console.log(err);
    });
  }
  public DeleteUser(u: User) {
    console.log("suppppppppppppppppppppppppppppp supprimé");
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
        this.userService.deleteUser(u.id).subscribe(() => {
        console.log("user supprimé"); 
      });
    this.router.navigate(['admin']).then(() => {
    window.location.reload();
  
  });
  }

  
}
   
    
  
  
