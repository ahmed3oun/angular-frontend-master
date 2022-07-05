import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-candidature',
  templateUrl: './edit-candidature.component.html',
  styleUrls: ['./edit-candidature.component.css']
})
export class EditCandidatureComponent implements OnInit {

  currentCandidature: any /* = new Candidature() */;
  candidats = <any>[]/* Candidat[]= [] */;
  offres: Offre[]= [];
  statuts: Statut[]= [];
  comps: Competence[]= [];
  currentToken : any ;
  constructor( private candidatureService : CandidatureService , private activatedRoute: ActivatedRoute ,
    public candidatService :CandidatService , public offreService : OffreService , private router :Router ,
    public statutService : StatutService , public compService : CompetenceService , private loginService : LoginJwtService) { }

  ngOnInit(): void {
    this.ExistToken();
    this.loadCurrentCandidature();
    this.LoadFK();
  }

  ExistToken(){
    this.currentToken = this.loginService.ExistToken();
    console.log("load token : "+ this.currentToken)
    if( this.currentToken == null ) 
      this.router.navigate(['login'])
  }

  loadCurrentCandidature(){

    this.candidatureService.currentCandidature(this.activatedRoute.snapshot.params.id).
    subscribe( candidature =>{ this.currentCandidature = candidature; 
     });
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

  updateCandidature() {
    this.candidatureService.updateCandidature(this.currentCandidature).subscribe(() => {
    this.router.navigate(['candidature']);
    },(error) => { alert("Problème lors de la modification !"); }
    );
  }

}
