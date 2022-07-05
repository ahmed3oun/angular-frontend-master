import { CandidatModel } from "./CandidatModel";
import { Competence } from "./competence";

export class Candidat implements CandidatModel {
    id! : number ;
    access! : string ;
    fournisseur! : string ;
    HBA! : String ;
    site! : string ;
    surfaceDisponible ! : String ;
    surfaceSite ! : String ;
    surfaceUtilise ! : String ;
    technologie!:String;
    typeStation! : string ;
    competence ! : Competence ; 
    date_mise_en_service! : string ;
    loyer_actuel! : string;
    locateur! : string

}