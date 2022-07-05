import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/service/document.service';
import { GouvernementService } from 'src/app/service/gouvernement.service';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import { SiteRadioService } from 'src/app/service/site-radio.service';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: [/* './edit-document.component.css' */]
})
export class EditDocumentComponent implements OnInit {

  gouverments: any[] = []
  siteRadioList: any[] = []
  currentToken: any;
  id: Number = new Number()
  /* edit-doc att*/
  currentDocument: {
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

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public docService: DocumentService,
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

  _loadCurrentDocument() {
    this.activatedRoute.params
      .subscribe(params => {
        console.log(params); // { id: "35" }
        this.id = params.id;
      }
      );
    this.docService.getDocumentById(this.id).subscribe(doc => {
      this.currentDocument.gouvernement_nom = doc.gouvernement.nom
      this.currentDocument.siteRadio_id = doc.siteRadio.id
      this.currentDocument.typeDoc = doc.typeDoc
    })
  }
  ngOnInit(): void {

    this._ExistToken()
    this._loadGouvernements()
    this._loadSiteRadios()
    this._loadCurrentDocument()
  }

  editDocument() {
    this.docService.updateDocument(this.currentDocument , this.id).subscribe(doc => {

      console.log("CHECK ADD DOCUMENT RESPONSE === " + doc);
      if (this.file) {
        this.docService.updtaeDocFile(doc.id, this.file!).subscribe(
          res => {
            console.log("CHECK UPLOAD DOC RESPONSE ===" + res);
            window.location.reload()
          }, err => {
            console.log("CHECK UPLOAD DOC ERR ===" + err);
            this.router.navigateByUrl('/doc')
            window.location.reload()
          }
        )
      }else{
        this.router.navigateByUrl("/doc")
      }
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
