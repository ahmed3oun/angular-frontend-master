import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/model/candidat';
import { Candidature } from 'src/app/model/candidature';
import { Competence } from 'src/app/model/competence';
import { Offre } from 'src/app/model/offre';
import { Statut } from 'src/app/model/statut';
import { CandidatService } from 'src/app/service/candidat.service';
import { CandidatureService } from 'src/app/service/candidature.service';
import { CompetenceService } from 'src/app/service/competence.service';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import { OffreService } from 'src/app/service/offre.service';
import { StatutService } from 'src/app/service/statut.service';

@Component({
  selector: 'app-add-candidature',
  templateUrl: './add-candidature.component.html',
  styleUrls: ['./add-candidature.component.css']
})
export class AddCandidatureComponent implements OnInit {

  candidats= <any>[];
  offres: Offre[]= [];
  statuts: Statut[]= [];
  comps: Competence[]= [];
  newCandidature : any /* = new Candidature() */ ;
  currentToken : any ;

  constructor(public router : Router , public loginService : LoginJwtService ,public candidatureService : CandidatureService ,public candidatService :CandidatService , public offreService : OffreService , public statutService : StatutService , public compService : CompetenceService) {   }

  ngOnInit(): void {
    this.ExistToken();
    this.LoadFK();
  }

  ExistToken(){
    this.currentToken = this.loginService.ExistToken();
    console.log("load token : "+ this.currentToken)
    if( this.currentToken == null ) 
      this.router.navigate(['login'])
  }
  LoadFK(){    
    
    this.candidatService.getCandidat().subscribe(candidat=>{  
      this.candidats = candidat
       console.log("projet" +this.candidats)
    }, err=>{
      console.log(err);
    });

    this.compService.getComp().subscribe(comp=>{  
      this.comps = comp
       console.log("comp " +this.comps)
    }, err=>{
      console.log(err);
    });

    this.offreService.getOffre().subscribe(offre=>{  
      this.offres = offre
       console.log("comp " +this.offres)
    }, err=>{
      console.log(err);
    });

    this.statutService.getStatut().subscribe(statut=>{  
      this.statuts = statut
       console.log("comp " +this.comps)
    }, err=>{
      console.log(err);
    });
}

addCandidature(){
  this.candidatureService.addCandidature(this.newCandidature).subscribe(candidature => {
  console.log(candidature); 
  }) ;
  this.router.navigate(['candidature']).then(() => {
    window.location.reload();
    });
}

}
