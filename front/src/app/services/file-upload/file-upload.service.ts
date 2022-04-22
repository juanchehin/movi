import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PersonaService } from '../service.index';

const base_url = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  token!: any;

  constructor(public personaService: PersonaService) {}

  // ==================================================
  //        actualizar foto
  // ==================================================
  async actualizarFoto(archivo: File, id: string) {
    console.log('archivo : ', archivo);

    try {
      const url = `${base_url}/upload/cargar/${id}`;

      const formData = new FormData();
      formData.append('imagen', archivo);

      console.log('formData : ', formData);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          token: this.personaService.token,
        },
        body: formData,
      });

      console.log('resp.ok es : ', resp.ok);

      const data = await resp.json();

      if (resp.ok) {
        console.log('pasa : ');
        return data.nombreArchivo;
      } else {
        console.log('pasa 1: ');
        console.log(data.msg);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
