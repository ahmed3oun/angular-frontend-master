import { Component, OnInit } from '@angular/core';
import { OffreService } from 'src/app/service/offre.service';
import { Router } from "@angular/router";
import { Offre } from 'src/app/model/offre';
import { ProjetService } from 'src/app/service/projet.service';
import { CompetenceService } from 'src/app/service/competence.service';
import { Projet } from 'src/app/model/projet';
import { Competence } from 'src/app/model/competence';
import { LoginJwtService } from 'src/app/service/login-jwt.service';

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
//  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent implements OnInit {

  constructor( public offreService : OffreService , public  router : Router ,
     public projetService : ProjetService , public compService : CompetenceService ,
     public authService : LoginJwtService) { }

  newOffre = new Offre();
  projets: Projet[]= [];
  comps: Competence[]= [];
  currentToken : any ;
  ngOnInit(): void {
    this.ExistToken();
    this.loadProjComp();
  }

  ExistToken(){
    this.currentToken = this.authService.ExistToken();
    console.log("load token : "+ this.currentToken)
    if( this.currentToken == null ) 
      this.router.navigate(['login'])
  }

  addOffre(){
    this.offreService.addOffre(this.newOffre).subscribe(offre => {
    console.log(offre); 
    }) ;
    this.router.navigate(['offre']).then(() => {
      window.location.reload();
      });
  }

  loadProjComp(){    
    
    this.projetService.getProjet().subscribe(projet=>{  
      this.projets = projet
       console.log("projet" +this.projets)
    }, err=>{
      console.log(err);
    });

    this.compService.getComp().subscribe(comp=>{  
      this.comps = comp
       console.log("comp " +this.comps)
    }, err=>{
      console.log(err);
    });

}
}


