import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cellule } from 'src/app/model/Cellule';
import { CelluleService } from 'src/app/service/cellule.service';
import { GouvernementService } from 'src/app/service/gouvernement.service';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import { SiteRadioService } from 'src/app/service/site-radio.service';

@Component({
  selector: 'app-edit-candidat',
  templateUrl: './edit-candidat.component.html',
  styleUrls: ['./edit-candidat.component.css']
})
export class EditCandidatComponent implements OnInit {


  currentToken: any;
  gouverments: any[] = [];
  cellules: Cellule[] = []
  newSite: {
    id: Number | undefined
    access: string,
    fournisseur: string,
    hba: string,
    site: string,
    surfaceDisponible: string,
    surfaceSite: string,
    surfaceUtilise: string,
    technologie: string,
    typeStation: string,
    date_mise_en_service: string,
    loyer_actuel: string,
    locateur: string,
    cellules_id: number[],
    gouvernement: string
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
      gouvernement: '',
      id: undefined
    };
  id: Number | undefined;
  gouvernements: [] | undefined
  constructor(
    public activatedRoute: ActivatedRoute,
    public gouvService: GouvernementService,
    public celluleService: CelluleService,
    public site_radio_service: SiteRadioService,
    public router: Router,
    public loginService: LoginJwtService) { }

  ngOnInit(): void {
    this.ExistToken();
    this.loadCurrentSite();
    this.loadGouvernements();
    this.loadCellules()
  }
  ExistToken() {
    this.currentToken = this.loginService.ExistToken();
    console.log("load token : " + this.currentToken)
    if (this.currentToken == null)
      this.router.navigate(['login'])
  }

  loadGouvernements() {

    this.gouvService.getGouvernements().subscribe(gouvernements => {
      /* gouvernements.forEach(gouv => {
        this.gouverments.push(gouv.nom)
      }) */
      this.gouverments = gouvernements
    }, err => {
      console.log(err);
    });
  }

  loadCellules() {
    this.celluleService.getNotUsedCellules().subscribe(cellules => {
      this.cellules = cellules
    }, err => {
      console.log(err);

    })
  }

  loadCurrentSite() {
    this.activatedRoute.params
      .subscribe(params => {
        console.log(params); // { id: "35" }
        this.id = params.id;
      }
      );
    this.site_radio_service.getSiteRadioById(this.id).subscribe(site => {
      this.newSite.access = site.access
      this.newSite.date_mise_en_service = site.date_mise_en_service
      this.newSite.fournisseur = site.fournisseur
      this.newSite.gouvernement = site.gouvernement.nom
      this.newSite.hba = site.hba
      this.newSite.locateur = site.locateur
      this.newSite.loyer_actuel = site.loyer_actuel
      this.newSite.site = site.site
      this.newSite.surfaceDisponible = site.surfaceDisponible
      this.newSite.surfaceSite = site.surfaceSite
      this.newSite.surfaceUtilise = site.surfaceUtilise
      this.newSite.technologie = site.technologie
      this.newSite.typeStation = site.typeStation
      /*  = */ site.cellules.forEach((elem: any) => {
        this.newSite.cellules_id.push(elem.id)
      })
      this.newSite.id = this.id

    })
  }

  addSite() {

    this.site_radio_service.updateSiteRadio(this.newSite).subscribe(res => {
      this.router.navigate(['siteRadio']).then(() => {
        window.location.reload();
      });
    }, err => {
      console.log(err);

    })
  }

}
