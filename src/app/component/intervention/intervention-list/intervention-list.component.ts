import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterventionService } from 'src/app/service/intervention.service';

@Component({
  selector: 'app-intervention-list',
  templateUrl: './intervention-list.component.html',
  styleUrls: []
})
export class InterventionListComponent implements OnInit {

   
  interventions: any[] = []

  constructor(public interventionService : InterventionService ,
              public router : Router ,
              ) { }

  ngOnInit(): void {
    this.interventionService.getInterventions().subscribe(data => {
      this.interventions = data
      console.log("interventions ***  " + this.interventions)
    }, err => {
      console.log(err);
    });
  }

  DeleteIntervention(id : number){
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.interventionService.deleteIntervention(id).subscribe(() => {
        console.log("intervention supprimé");
      }, (err)=> {
        console.log(err);
      });
    this.router.navigate(['intervention']).then(() => {
      window.location.reload();
    });
  }
}
