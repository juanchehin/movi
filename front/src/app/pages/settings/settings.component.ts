import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: []
})
export class SettingsComponent implements OnInit {

  date: any;
  persona: any;

  constructor(
    public settingsService: SettingsService,
  ) {

  }

  ngOnInit(): void {
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

    if (confirmar) {
      console.log("pasa confirmar")

      this.settingsService.backup( )
      .subscribe( (resp: any) => {
        console.log("resp en settings es : ",resp)

        return;
      });

      // this.planService.backup();
    }
  })
}

}
