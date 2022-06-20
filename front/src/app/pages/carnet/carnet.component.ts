import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/services/service.index';
// import {NgxPrintModule} from 'ngx-print';

@Component({
  selector: 'app-carnet',
  templateUrl: './carnet.component.html',
  styleUrls: []
})
export class CarnetComponent implements OnInit {

  Apellidos!: string;
  Nombres!: string;
  private date!: any;
  persona: any;
  Documento: any = null;
  public IdPersona: any = null;


  constructor(
    public personaService: PersonaService,
    private activatedRoute: ActivatedRoute
    ) {
     }

  ngOnInit() {
    this.cargarDatos();

  }
// ==================================================
//        Nueva medicion
// ==================================================

cargarDatos() {

  this.date = this.activatedRoute.snapshot.paramMap.get('id');

  this.personaService.damePersona( this.date )
             .subscribe( (resp: any) => {

              this.persona = resp[0];

              this.Apellidos =  this.persona.Apellidos;
              this.Nombres = this.persona.Nombres;
              this.Documento = this.persona.Documento;
              this.IdPersona = this.persona.IdPersona;
              // this.cargando = false;

            });


}

}
