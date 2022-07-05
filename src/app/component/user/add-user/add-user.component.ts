import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from "@angular/router";
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddAdminComponent implements OnInit {



  constructor(public userService: UserService,
          public router: Router,
          public roleService: RoleService,
          public authService: LoginJwtService,
          ) { }

  newUser = new User();
  roles: any[] = [];
  currentToken: any;
  @ViewChild('role') role: ElementRef<HTMLInputElement> | undefined;
  imgFile?: File
  imgURL: any



  ngOnInit(): void {
    this.ExistToken();

    this.loadRoles();
    console.log(this.roles);

  }

  ExistToken() {
    this.currentToken = this.authService.ExistToken();
    console.log("load token : " + this.currentToken)
    if (this.currentToken == null)
      this.router.navigate(['login'])
  }

  selectFile(event: any) {
    this.imgFile = event.target.files.item(0)
    console.log(this.imgFile);
    var reader = new FileReader();
    reader.readAsDataURL(this.imgFile!);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  addUser() {

    this.newUser.role = this.role?.nativeElement.value!

    this.userService.addUser(this.newUser).subscribe(user => {

      console.log("CHECK ADD USER RESPONSE === " + user);

      this.userService.updateUserImage(this.imgFile!, user.id).subscribe(
        res => {
          console.log("CHECK UPLOAD IMG RESPONSE ===" + res);
        }, err => {
          console.log("CHECK UPLOAD IMG ERR ===" + err);
        }
      )
    }, err => {
      console.log(err);
    });
    /* this.router.navigate(['admin']).then(() => {
      window.location.reload();
      }); */

  }
  loadRoles() {

    this.roleService.getRoles().subscribe(roles => {
      //this.roles = roles
      roles.forEach(role => {
        this.roles.push(role.nom)
      })
    }, err => {
      console.log(err);
    });

  }



}