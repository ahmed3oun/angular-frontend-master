import { Component, OnInit } from '@angular/core';
import { CandidatService } from 'src/app/service/candidat.service';
import { Router } from "@angular/router";

import { LoginJwtService } from 'src/app/service/login-jwt.service';
import { GouvernementService } from 'src/app/service/gouvernement.service';
import { SiteRadioService } from 'src/app/service/site-radio.service';
import { CelluleService } from 'src/app/service/cellule.service';
import { Cellule } from 'src/app/model/Cellule';

@Component({
  selector: 'app-add-candidat',
  templateUrl: './add-candidat.component.html',
 // styleUrls: ['./add-candidat.component.css']
})
export class AddCandidatComponent implements OnInit {

  constructor( 
    public  router : Router ,
    public gouvService : GouvernementService ,
    public celluleService : CelluleService,
    public site_radio_service : SiteRadioService,
    public loginService : LoginJwtService) { }

  //newSite = new Candidat();
  newSite : { access : string ,
             fournisseur : string ,
             hba : string ,
             site : string ,
             surfaceDisponible : string ,
             surfaceSite : string ,
             surfaceUtilise : string ,
             technologie : string ,
             typeStation : string ,
             date_mise_en_service : string ,
             loyer_actuel : string ,
             locateur : string ,
             cellules_id : number[],
             gouvernement : string
            } = {
              access: '',
              fournisseur: '',
              hba: '',
              site: '',
              surfaceDisponible: '',
              surfaceSite: '',
              surfaceUtilise: '',
              technologie: '',
              typeStation: '',
              date_mise_en_service: '',
              loyer_actuel: '',
              locateur: '',
              cellules_id: [],
              gouvernement: ''
            } ;
  
  gouverments: any[]= [];
  //_gouverments: string[]= ['Sousse' , 'Sfax'];
  cellules : Cellule[] = []
  currentToken : any ;
  val = "HELLO WORLD"

  ngOnInit(): void {    
    this.ExistToken();
    this.loadGouvernements();
    this.loadCellules();    
  }
  isEngineer(){
    return this.loginService.isENGINEER()
  }
  ExistToken(){
    this.currentToken = this.loginService.ExistToken();
    console.log("load token : "+ this.currentToken)
    if( this.currentToken == null ) 
      this.router.navigate(['login'])
  }
  addSite(){
    console.log("*********** new site radio : => ",this.newSite);
    
    this.site_radio_service.addsiteRadio(this.newSite).subscribe(response => {
      this.router.navigateByUrl('/siteRadio').then(()=>{
        window.location.reload();
      })

      
    },err => {
      console.log("err" , err);
      this.router.navigateByUrl('/siteRadio').then(()=>{
        window.location.reload();
      })
    })
    
  }
   

   loadGouvernements(){    

    this.gouvService.getGouvernements().subscribe(gouvernements=>{  
      
      this.gouverments = gouvernements
    }, err=>{
      console.log(err);
    });
  }
  
  loadCellules(){
    this.celluleService.getNotUsedCellules().subscribe(cellules => {
      this.cellules = cellules
    },err=>{
      console.log(err);
      
    })
  }

  

}
