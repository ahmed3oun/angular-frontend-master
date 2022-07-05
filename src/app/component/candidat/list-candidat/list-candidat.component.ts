import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginJwtService } from 'src/app/service/login-jwt.service';
import { SiteRadioService } from 'src/app/service/site-radio.service';

@Component({
  selector: 'app-list-candidat',
  templateUrl: './list-candidat.component.html'
  // styleUrls: ['./list-candidat.component.css']
})
export class ListCandidatComponent implements OnInit {

  site_radios: any[] = [];
  currentToken: any;
  constructor(private siteRadioService: SiteRadioService
    , private router: Router, private authService: LoginJwtService) { }

  ngOnInit(): void {
    this.ExistToken();
    this.loadsite_radios();
  }

  ExistToken() {
    this.currentToken = this.authService.ExistToken();
    console.log("load token : " + this.currentToken)
    if (this.currentToken == null)
      this.router.navigate(['login'])
  }

  loadsite_radios() {
    this.siteRadioService.getsiteRadio().subscribe(data => {
      this.site_radios = data
      console.log("candidat  " + this.site_radios)
    }, err => {
      console.log(err);
    });
  }


  public DeleteCandidat(id : number) {
    console.log("suppppppppppppppppppppppppppppp supprimé : " , id);

    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.siteRadioService.deleteSiteRadio(id).subscribe(() => {
        console.log("produit supprimé");
      });
    this.router.navigate(['siteRadio']).then(() => {
      window.location.reload();
    });
  }

  public isENGINEER() {
    return this.authService.isENGINEER();
  }

  public isAdmin() {
    return this.authService.isAdmin();
  }


}
