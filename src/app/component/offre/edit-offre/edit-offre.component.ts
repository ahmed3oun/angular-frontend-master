import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competence } from 'src/app/model/competence';
import { Offre } from 'src/app/model/offre';
import { Projet } from 'src/app/model/projet';
import { CompetenceService } from 'src/app/service/competence.service';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import { OffreService } from 'src/app/service/offre.service';
import { ProjetService } from 'src/app/service/projet.service';

@Component({
  selector: 'app-edit-offre',
  templateUrl: './edit-offre.component.html',
 // styleUrls: ['./edit-offre.component.css']
})
export class EditOffreComponent implements OnInit {

  currentOffre = new Offre();
  competences: Competence[] = [];
  projets: Projet[] = [];
  currentToken : any ;
  constructor(private offreService : OffreService , private activatedRoute: ActivatedRoute ,
    private compService : CompetenceService  , private projetService : ProjetService,private router : Router, private loginService : LoginJwtService) { }

  ngOnInit(): void {
    this.ExistToken();
    this.loadCurrentOffre();
    this.loadComp();
    this.loadProjet();
  }

  ExistToken(){
    this.currentToken = this.loginService.ExistToken();
    console.log("load token : "+ this.currentToken)
    if( this.currentToken == null ) 
      this.router.navigate(['login'])
  }

  loadCurrentOffre(){

    this.offreService.consulterOffre(this.activatedRoute.snapshot.params.id).
    subscribe( offre =>{ this.currentOffre = offre; 
    });
  }

  loadComp(){      
    this.compService.getComp().subscribe(comp=>{  
      this.competences = comp
    }, err=>{
      console.log(err);
    });
  }

  loadProjet(){      
    this.projetService.getProjet().subscribe(projet=>{  
      this.projets = projet
    }, err=>{
      console.log(err);
    });
  }

  updateoffre() {
    this.offreService.updateOffre(this.currentOffre).subscribe(() => {
    this.router.navigate(['offre']);
    },(error) => { alert("Problème lors de la modification !"); }
    );
  }

}
