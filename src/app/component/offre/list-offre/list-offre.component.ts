import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offre } from 'src/app/model/offre';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import { OffreService } from 'src/app/service/offre.service';

@Component({
  selector: 'app-list-offre',
  templateUrl: './list-offre.component.html',
 // styleUrls: ['./list-offre.component.css']
})
export class ListOffreComponent implements OnInit {
  show = true ;
  currentToken : any;
  constructor(private offreService : OffreService , private router : Router , private authService : LoginJwtService) { }

  ngOnInit(): void {
    this.ExistToken();
    this.loadOffres();
  }
  offres: Offre[]= [];

  ExistToken(){
    this.currentToken = this.authService.ExistToken();
    console.log("load token : "+ this.currentToken)
    if( this.currentToken == null ) 
      this.router.navigate(['login'])
  }

  loadOffres(){    
      this.offreService.getOffre().subscribe(data=>{  
        this.offres = data
         console.log("offres " +this.offres)
      }, err=>{
        console.log(err);
      });
    }
    public DeleteOffre(o: Offre) {
        let conf = confirm("Etes-vous sûr ?");
        if (conf)
          this.offreService.deleteOffre(o.id).subscribe(() => {
          console.log("produit supprimé"); 
        });
      this.router.navigate(['offre']).then(() => {
      window.location.reload();
    
    });
    }

    
    public isUser(){
      return !(this.authService.isUser()) ;
    }
}
