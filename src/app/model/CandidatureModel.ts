import { Candidat } from "./candidat";
import { Competence } from "./competence";
import { Offre } from "./offre";
import { Statut } from "./statut";

export interface CandidatureModel {

    id : number ;
    code : string ;
    evaluateur : string ;
    eo_bd : Date ;
    eo_client : Date ;
    test : Date ;
    commentaire : string ;
    eval_com1 : number ;
    eval_com2 : number ;
    eval_com3 : number ;
    eval_com4 : number ;
    eval_com5 : number ;
    eval_com6 : number ;
    eval_com7 : number ;
    commentaire_tech : string ;
    eval_ang : number ;
    eval_fran : number ;
    commentaire_ss : string ;
    synthese : string ;
    conclusion : string ;
    commentaire_conls : string ; 
    offre : Offre ;
    candidat : Candidat ;
    statut_bd : Statut ;
    statut_client : Statut ;
    statut_test : Statut ;
    statut_glob : Statut ;
    competence1 : Competence ;
    competence2 : Competence ;
    competence3 : Competence ;
    competence4 : Competence ;
    competence5 : Competence ;
    competence6 : Competence ;
    competence7 : Competence ;
}