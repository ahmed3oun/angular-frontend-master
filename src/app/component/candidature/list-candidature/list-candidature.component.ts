import { Component, OnInit , ViewChild , ElementRef   } from '@angular/core';
import { Router } from '@angular/router';
import { Candidature } from 'src/app/model/candidature';
import { CandidatureService } from 'src/app/service/candidature.service';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import {jsPDF} from 'jspdf'
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-list-candidature',
  templateUrl: './list-candidature.component.html',
  styleUrls: ['./list-candidature.component.css']
})
export class ListCandidatureComponent implements OnInit {

  candidatures/* : Candidature[] */ = <any>[];
  currentToken : any ;
  @ViewChild('table123' , {static: false}) el! : ElementRef ;
  constructor( private authService : LoginJwtService , private candidatureService : CandidatureService , private router : Router) { }

  ngOnInit(): void {
    this.ExistToken();
    this.loadCandidature();
  }

  ExistToken(){
    this.currentToken = this.authService.ExistToken();
    console.log("load token : "+ this.currentToken)
    if( this.currentToken == null ) 
      this.router.navigate(['login'])
  }

  loadCandidature(){    
    this.candidatureService.getCandidature().subscribe(data=>{  
    this.candidatures = data
      
    }, err=>{
      console.log(err);
    });
  }

  public isENGINEER(){
    return this.authService.isENGINEER(); 
  }
  public isUser(){
    return !(this.authService.isUser()) ;
  }

  public DeleteCandidature(c: Candidature) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.candidatureService.deleteCandidature(c.id).subscribe(() => {});
  this.router.navigate(['candidature']).then(() => {
  window.location.reload();

});
}
makePDF(){
  let pdf = new jsPDF('p','pt','a2');
  pdf.html(this.el.nativeElement , {
    callback:(pdf) => {
      pdf.save("candidature.pdf");
    }
  }) ;
  
}

exportExcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('table123');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, 'candidature.xlsx');
 
  }
}
