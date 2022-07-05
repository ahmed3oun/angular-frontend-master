import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/service/document.service';
import { GouvernementService } from 'src/app/service/gouvernement.service';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import { SiteRadioService } from 'src/app/service/site-radio.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styles:[`
     .ovh{
      max-height : 50rem;
      overflow-y : auto;
     }
  `]
})
export class DocumentListComponent implements OnInit {

  documents: any[] = []
  gouverments: any[] = []
  siteRadioList: any[] = []
  currentToken: any;
  /* add-doc att*/
  newDocument: {
    gouvernement_nom: string,
    siteRadio_id: Number,
    typeDoc: string
  } = {
      gouvernement_nom: '',
      siteRadio_id: new Number(),
      typeDoc: ''
    }

  file?: File
  fileVal: any

  constructor(public docService: DocumentService,
    public router: Router,
    public activatedRoute : ActivatedRoute,
    public gouvernementService: GouvernementService,
    public siteRadioService: SiteRadioService,
    public loginService: LoginJwtService,
  ) { }

  _loadGouvernements() {

    this.gouvernementService.getGouvernements().subscribe(gouvernements => {

      this.gouverments = gouvernements
    }, err => {
      console.log(err);
    });
  }
  _loadDocuments() {

    this.docService.getDocuments().subscribe(docs => {

      this.documents = docs
    }, err => {
      console.log(err);
    });
  }
  _loadSiteRadios() {

    this.siteRadioService.getsiteRadio().subscribe(siteRadios => {

      this.siteRadioList = siteRadios
    }, err => {
      console.log(err);
    });
  }
  _ExistToken() {
    this.currentToken = this.loginService.ExistToken();
    if (this.currentToken == null)
      this.router.navigate(['login'])
  }
  ngOnInit(): void {
    
    this._ExistToken()
    this._loadDocuments()
    this._loadGouvernements()
    this._loadSiteRadios()
  }

  deleteDocument(id: number) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.docService.deleteDocument(id).subscribe(() => {
        console.log("document supprimé");
      }, (err) => {
        console.log(err);
      });
    this.router.navigate(['/doc']).then(() => {
      window.location.reload();
    });
  }

  addDocument() {
    this.docService.addDocument(this.newDocument).subscribe(doc => {

      console.log("CHECK ADD DOCUMENT RESPONSE === " + doc);

      this.docService.updtaeDocFile(doc.id, this.file!).subscribe(
        res => {
          console.log("CHECK UPLOAD DOC RESPONSE ===" + res);
          window.location.reload()
        }, err => {
          console.log("CHECK UPLOAD DOC ERR ===" + err);
          window.location.reload()
        }
      )
    }, err => {
      console.log(err);
    });
  }

  selectFile(event: any) {
    this.file = event.target.files.item(0)
    console.log(this.file);
    var reader = new FileReader();
    reader.readAsDataURL(this.file!);
    reader.onload = (_event) => {
      this.fileVal = reader.result;
    }
  }

}
