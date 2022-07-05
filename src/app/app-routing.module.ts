import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminComponent } from './component/user/add-user/add-user.component';
import { EditAdminComponent } from './component/user/edit-user/edit-user.component';
import { ListAdminComponent } from './component/user/list-user/list-user.component';
import { AddCandidatComponent } from './component/candidat/add-candidat/add-candidat.component';
import { EditCandidatComponent } from './component/candidat/edit-candidat/edit-candidat.component';
import { ListCandidatComponent } from './component/candidat/list-candidat/list-candidat.component';
import { AddCandidatureComponent } from './component/candidature/add-candidature/add-candidature.component';
import { EditCandidatureComponent } from './component/candidature/edit-candidature/edit-candidature.component';
import { ListCandidatureComponent } from './component/candidature/list-candidature/list-candidature.component';
import { MenuComponent } from './component/menu/menu.component';
import { AddOffreComponent } from './component/offre/add-offre/add-offre.component';
import { EditOffreComponent } from './component/offre/edit-offre/edit-offre.component';
import { ListOffreComponent } from './component/offre/list-offre/list-offre.component';
import { LoginComponent } from './component/login/login.component';
import { FormCandidatureComponent } from './component/candidature/form-candidature/form-candidature.component';
import { AddCelluleComponent } from './component/candidat/add-cellule/add-cellule.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsEngineerGuard } from './guards/is-engineer.guard';
//import { InterventionComponent } from './component/intervention/intervention.component';
import { IsInterventionGuard } from './guards/is-intervention.guard';
import { InterventionListComponent } from './component/intervention/intervention-list/intervention-list.component';
import { DocumentListComponent } from './component/document/document-list/document-list.component';
import { EditDocumentComponent } from './component/document/edit-document/edit-document.component';



const routes: Routes = [
  
  {path:'login' , component: LoginComponent  } ,
  {path:'menu'  , component:  MenuComponent },  
 {path:'siteRadio' , component: ListCandidatComponent , canActivate:[/* !IsInterventionGuard */] } ,
 {path:'addCellule' , component: AddCelluleComponent  , canActivate:[/* !IsInterventionGuard */]} ,
 {path:'addSite' , component: AddCandidatComponent ,canActivate:[/* !IsInterventionGuard */] } ,
 {path:'editSite/:id' , component: EditCandidatComponent  } ,
 {path:'admin' , component: ListAdminComponent , canActivate:[ /* IsAdminGuard  */IsEngineerGuard]  } ,
 {path:'addAdmin' , component: AddAdminComponent , canActivate:[IsAdminGuard/* ,!IsInterventionGuard */] } ,
 {path:'editAdmin/:id' , component: EditAdminComponent ,  canActivate:[IsAdminGuard/* ,!IsInterventionGuard */] } ,
 {path:'doc' , component: DocumentListComponent  } ,
 {path:'edit-doc/:id' , component: EditDocumentComponent  } ,
 {path:'offre' , component: ListOffreComponent  } ,
 {path:'addOffre' , component: AddOffreComponent  } ,
 {path:'editOffre/:id' , component: EditOffreComponent  } ,
 {path:'candidature' , component: ListCandidatureComponent  } ,
 {path:'addCandidature' , component: AddCandidatureComponent  } ,
 {path:'editCandidature/:id' , component: EditCandidatureComponent  } ,
 {path:'formulaire/:id' , component: FormCandidatureComponent  }, 
 {path:'intervention' , component: /* InterventionComponent */ InterventionListComponent  , canActivate:[IsInterventionGuard] }, 
 {path:'**' , redirectTo: localStorage.getItem('jwt') === null ? '/login' : '/menu' , pathMatch:'full'} ,
] ;


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})    
export class AppRoutingModule { }
