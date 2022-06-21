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

async carnet() {


  this.docDefinition = {
    content: [
      this.Apellidos + this.Nombres,
      {
        image: await this.getBase64ImageFromURL(
          "../../../assets/images/franja-movi.png"
        )
      },
      { qr: this.Documento },
    ],

    defaultStyle: {
      fontSize: 15,
      bold: true
    }
  };

  pdfMake.createPdf(this.docDefinition).download('file.pdf');
}

// ==============================
// Convierte a base64
// =================================================================
getBase64ImageFromURL(url: any) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      resolve(dataURL);
    };

    img.onerror = error => {
      reject(error);
    };

    img.src = url;
  });}

}
