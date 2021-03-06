import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PersonaService } from '../persona/persona.service';
import { environment } from '../../../environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  Fecha = new Date();

  constructor(
    private http: HttpClient, private router: Router, private personaService: PersonaService
  ) {

  }

// ==================================================
// Carga las asistencias del cliente dado su IdPersona
// ==================================================
dameAsistencias(  IdPersona: any , desde = 0 ) {

  let url = URL_SERVICIOS + '/asistencias/' + desde + '/' + IdPersona;

  return this.http.get(
            url, {
              headers: {
                token: this.personaService.token
              }
            }
        );
}
// ==================================================
//  Marca la asistencia , recibe un IdPersona y un IdPlan
// ==================================================
marcarAsistenciaPersona( IdPersona: number = 0  ) {

  let url = URL_SERVICIOS + '/asistencias/cliente/' + IdPersona;

  return this.http.get( url,
    {
      headers: {
        token: this.personaService.token
      }
    }
  );

}

}
