import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';

import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fotografia',
  templateUrl: './fotografia.component.html'
})
export class FotografiaComponent implements OnInit {

  // uploadedFiles: string;

  // === Codigo para webcam ===
  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: any;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  // === Fin Codigo para webcam ===

  forma!: FormGroup;
  respuesta: any;
  cargando = true;
  aparecer = false;
  parametro: any;

  mostrarcamara = false;
  mostrarcaptura = false;
  img: any = null;
  public imagenSubir: any;
  public imgTemp: any = null;
  id: any;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public fileUploadService: FileUploadService,
    private _sanitizer: DomSanitizer
  ) {
   }


  ngOnInit() {

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

    this.forma = new FormGroup({
      IdRol: new FormControl('0', Validators.required )

    })

  }


// ==================================================
//        Nuevo foto
// ==================================================

registrarFoto() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    const resp = this.fileUploadService
      .actualizarFoto( this.imagenSubir, this.id )
      .then( img => {
        if(img){
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        }
        else{
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        }

        // this.modalImagenService.nuevaImagen.emit(img);

      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })

    console.log("resp resp : ",resp);

}


// ==================================================
//  Muestra/Oculta la camara
// ==================================================

modificarCamara() {

  if(this.mostrarcamara == false)
  {
    this.mostrarcamara = true;
  }
 else{
    this.mostrarcamara = false;
 }
}
// ==================================================
//  ***** Codigo para la camara *****
// ==================================================

public triggerSnapshot(): void {
  this.trigger.next();
}

public toggleWebcam(): void {
  this.showWebcam = !this.showWebcam;
}

public handleInitError(error: WebcamInitError): void {
  this.errors.push(error);
}

public showNextWebcam(directionOrDeviceId: boolean|string): void {
  // true => move forward through devices
  // false => move backwards through devices
  // string => move to device with given deviceId
  this.nextWebcam.next(directionOrDeviceId);
}

public handleImage(webcamImage: WebcamImage): void {
  console.info('received webcam image', webcamImage);
  this.img = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'
                 + webcamImage.imageAsBase64);

  this.mostrarcamara = false;
  this.mostrarcaptura = true;

  // var imageBase64 = "image base64 data";
  var blob = new Blob([this.img], {type: 'image/png'});
  this.imagenSubir = new File([blob], 'imageFileName.png');
  // this.img = webcamImage.imageAsDataUrl;

  console.log("imagenSubir es : ",this.imagenSubir);
  this.pictureTaken.emit(webcamImage);
}

public cameraWasSwitched(deviceId: string): void {
  console.log('active device: ' + deviceId);
  this.deviceId = deviceId;
}

public get triggerObservable(): Observable<void> {
  return this.trigger.asObservable();
}

public get nextWebcamObservable(): Observable<boolean|string> {
  return this.nextWebcam.asObservable();
}

// ==================================================
//  ***** Fin Codigo para la camara *****
// ==================================================
}

