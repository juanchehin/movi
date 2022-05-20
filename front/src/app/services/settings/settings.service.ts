import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PersonaService } from '../persona/persona.service';
import { environment } from '../../../environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;


@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  constructor(
    public http: HttpClient, public router: Router, public personaService: PersonaService
  ) {

  }

// ==================================================
//   Realiza backup
// ==================================================

backup() {


  const url = URL_SERVICIOS + '/settings/backup';

  return this.http.get (url,
    {
      headers: {
        token: this.personaService.token
      }
    });

}

// ==================================================
//   Realiza sincronizacion con drive
// ==================================================

sinc() {

  const url = URL_SERVICIOS + '/settings/drive';

  return this.http.get (url,
    {
      headers: {
        token: this.personaService.token
      }
    });

}


}
