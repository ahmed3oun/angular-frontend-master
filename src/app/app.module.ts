import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from './component/menu/menu.component';
import { ListCandidatComponent } from './component/candidat/list-candidat/list-candidat.component';
import { AddCandidatComponent } from './component/candidat/add-candidat/add-candidat.component';
import { EditCandidatComponent } from './component/candidat/edit-candidat/edit-candidat.component';
import { ListAdminComponent } from './component/user/list-user/list-user.component';
import { AddAdminComponent } from './component/user/add-user/add-user.component';
import { EditAdminComponent } from './component/user/edit-user/edit-user.component';
import { ListOffreComponent } from './component/offre/list-offre/list-offre.component';
import { AddOffreComponent } from './component/offre/add-offre/add-offre.component';
import { EditOffreComponent } from './component/offre/edit-offre/edit-offre.component';
import { ListCandidatureComponent } from './component/candidature/list-candidature/list-candidature.component';
import { AddCandidatureComponent } from './component/candidature/add-candidature/add-candidature.component';
import { EditCandidatureComponent } from './component/candidature/edit-candidature/edit-candidature.component';

import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { FormCandidatureComponent } from './component/candidature/form-candidature/form-candidature.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCelluleComponent } from './component/candidat/add-cellule/add-cellule.component';
import { InterventionComponent } from './component/intervention/intervention.component';
import { InterventionListComponent } from './component/intervention/intervention-list/intervention-list.component';
import { DocumentListComponent } from './component/document/document-list/document-list.component';
import { EditDocumentComponent } from './component/document/edit-document/edit-document.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListCandidatComponent,
    AddCandidatComponent,
    EditCandidatComponent,
    ListAdminComponent,
    AddAdminComponent,
    EditAdminComponent,
    ListOffreComponent,
    AddOffreComponent,
    EditOffreComponent,
    ListCandidatureComponent,
    AddCandidatureComponent,
    EditCandidatureComponent,
    LoginComponent,
    FormCandidatureComponent,
    AddCelluleComponent,
    InterventionComponent,
    InterventionListComponent,
    DocumentListComponent,
    EditDocumentComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule ,
    FormsModule,
    NgbModule,
   
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
