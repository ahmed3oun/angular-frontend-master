import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadStart, Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditAdminComponent implements OnInit {

  currentUser = new User();
  roles: string[] = [];
  currentToken : any ;
  imgFile? : File 
  imgURL : any


  constructor( private userService : UserService , private activatedRoute: ActivatedRoute ,
    private roleService : RoleService  , private router : Router , private authService : LoginJwtService) { }

  ngOnInit(): void {
    this.ExistToken();
    this.ExistToken();
    this.loadCurrentUser();
    this.loadRoles();
  }

  ExistToken(){
    this.currentToken = this.authService.ExistToken();
    console.log("load token : "+ this.currentToken)
    if( this.currentToken == null ) 
      this.router.navigate(['login'])
  }

  loadCurrentUser(){

    this.userService.consulterUser(this.activatedRoute.snapshot.params.id).
    subscribe( res =>{
      this.currentUser.id = res.id
      this.currentUser.username = res.username;
      this.currentUser.email = res.email; 
      this.currentUser.imageUrl = res.imageUrl; 
      this.currentUser.role = res.role.nom; 
      this.currentUser.password = res.password; 

      
       console.log("usrrname "+this.currentUser.username)
       console.log("id "+this.currentUser.id)
       console.log("email "+this.currentUser.email)
       console.log("password "+this.currentUser.password)
       console.log("role "+this.currentUser.role)
    });
  }
  loadRoles(){    
    
    this.roleService.getRoles().subscribe(res=>{  
      res.forEach(role => {
        this.roles.push(role.nom);
      })
       console.log("roles ==== " +this.roles)
    }, err=>{
      console.log(err);
    });
  }

  updateUser() {

    console.log("CKECK UPDATE USER === " + this.currentUser);
    const id_user = this.currentUser.id 
    
    this.userService.updateUser({
      "id" : id_user,
      "email" : this.currentUser.email,
      "username" : this.currentUser.username,
      "password" : this.currentUser.password,
      "role" : this.currentUser.role,
      
    }).subscribe((res) => {
        console.log("CHECK RESPONSE ==="+res);
        this.userService.updateUserImage(this.imgFile!,id_user).subscribe((res)=>{
          
        },(err)=> {
          console.log(err);
          this.router.navigate(['admin']).then(()=> window.location.reload());
        })
      },(error) => { 
        console.log(error);
        
      }
      )
      
  }
  selectFile(event:any){
    this.imgFile = event.target.files.item(0)
    console.log(this.imgFile);
    var reader = new FileReader();
    reader.readAsDataURL(this.imgFile!); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    } 
  }
}
