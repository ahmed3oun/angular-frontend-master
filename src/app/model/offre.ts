import { Competence } from "./competence";
import { Projet } from "./projet";


export class Offre {
    
 id! : number ;
 projet! : Projet ;
 competence! : Competence ;
 profil! : string ;
 nb_etp! : number ;
 dispo! : number ;
 proba! : number ;
 date_demarrage! : Date ;
 date_soumission! : Date ;
 duree_mission! : number ;
 statut! : string ;
 tjm! : number ;
 commentaire! : string ;
}