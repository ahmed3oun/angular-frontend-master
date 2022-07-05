import { Component, OnInit , ViewChild , ElementRef} from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidature } from 'src/app/model/candidature';
import { Competence } from 'src/app/model/competence';
import { CandidatureService } from 'src/app/service/candidature.service';
import { CompetenceService } from 'src/app/service/competence.service';


@Component({
  selector: 'app-form-candidature',
  templateUrl: './form-candidature.component.html',
  styleUrls: ['./form-candidature.component.css']
})
export class FormCandidatureComponent implements OnInit {

  competences: Competence[] = [];
  currentCandidature = new Candidature();

  constructor(private compService : CompetenceService , private candidatureService : CandidatureService ,
    private router :Router ,  private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadCurrentCandidature();
    this.loadComp();
    
  }

  loadCurrentCandidature(){

    this.candidatureService.currentCandidature(this.activatedRoute.snapshot.params.id).
    subscribe( candidature =>{ this.currentCandidature = candidature; 
    });
  }

  loadComp(){
    this.compService.getComp().subscribe(comp=>{  
      this.competences = comp
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
