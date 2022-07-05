import { Component, OnInit } from '@angular/core';
import { CandidatService } from 'src/app/service/candidat.service';
import { Router } from "@angular/router";
import { Candidat } from 'src/app/model/candidat';
import { CompetenceService } from 'src/app/service/competence.service';
import { CelluleService } from 'src/app/service/cellule.service';
import { Competence } from 'src/app/model/competence';
import { Cellule } from 'src/app/model/Cellule';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
@Component({
  selector: 'add-cellule',
  templateUrl: './add-cellule.component.html',
  styleUrls: ['./add-cellule.component.css']
})
export class AddCelluleComponent implements OnInit {

  constructor(public candidatService: CandidatService,
    public router: Router,
    public celService: CelluleService,
    public loginService: LoginJwtService) { }

  /* newCandidat = new Candidat(); */
  comps: Competence[] = [];
  cels: Cellule = new Cellule()/* new Cellule() */;
  currentToken: any;

  ngOnInit(): void {
    this.ExistToken();
    
  }
  ExistToken() {
    this.currentToken = this.loginService.ExistToken();
    console.log("load token : " + this.currentToken)
    if (this.currentToken == null)
      this.router.navigate(['login'])
  }

  addCellule() {
    console.log("****** new cellule : ",this.cels);
    
    this.celService.addCellule(this.cels).subscribe(cellule => {
      console.log("new cellule " + this.cels);
    });
    this.router.navigate(['addSite']).then(() => {
      window.location.reload();
    });
  }




}





