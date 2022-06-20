import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/services/service.index';

import * as pdfMake from "pdfmake/build/pdfmake";
// // instead of import the default fonts  (import pdfFonts from "pdfmake/build/vfs_fonts";), you import your custom fonts
import * as pdfFonts from "pdfmake/build/vfs_fonts.js"; // The path of your custom fonts

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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

  docDefinition: any;


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


// ==================================================
//        carnet
// ==================================================

carnet() {

  this.docDefinition = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    watermark: { text: 'No válido como factura', color: 'red', fontSize: 20, opacity: 0.2, bold: true, italics: false },

    defaultStyle: {
      fontSize: 10,
      alignment: 'justify'
    }
  };

  pdfMake.createPdf(this.docDefinition).download('file.pdf');
}
}
