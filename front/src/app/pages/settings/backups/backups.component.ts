import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-backups',
  templateUrl: './backups.component.html',
  styleUrls: []
})
export class BackupsComponent implements OnInit {

  backups: any;
  desde = 0;

  totalBackups = 0;
  cargando = true;

  constructor(
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.cargarBackups();
  }

// ==================================================
//        Carga los backups realizados
// ==================================================

cargarBackups() {

    this.settingsService.listarBackups( this.desde )
               .subscribe( (resp: any) => {

                this.totalBackups = resp[1][0].totalBackups;

                if (resp[1][0].totalBackups === null) {
                  this.totalBackups = 0;
                }

                this.backups = resp[0];
                this.cargando = false;

              });

  }

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    if ( desde >= this.totalBackups ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarBackups();

  }

  // ==================================================
//    Sincronizacion con Google Drive
// ==================================================

sinc() {

  this.settingsService.backup( )
  .subscribe( (resp: any) => {

    if ( resp.Mensaje === 'Ok') {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Backup realizado con exito',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
          Swal.fire({
            icon: 'error',
            title: 'Hubo un problema',
            text: resp.Mensaje
          });
        }
      return;

  });

}

// ==================================================
//        Backup
// ==================================================

backup() {

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Recuerde que esto puede tardar unos minutos',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar'
  })
  .then( confirmar => {

    if (confirmar.value) {

      this.settingsService.backup( )
      .subscribe( (resp: any) => {

        if ( resp.Mensaje === 'Ok') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Backup realizado con exito',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
              Swal.fire({
                icon: 'error',
                title: 'Hubo un problema al cargar',
                text: resp.Mensaje
              });
            }
          return;

      });

    }
  })
}



}
