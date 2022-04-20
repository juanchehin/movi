import express, { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import uploadController from '../controllers/uploadController';

class UploadRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.put('/cargar/:id/',mdAutenticacion.verificaToken, uploadController.subirImagen);
        this.router.get('/retorna/:id/',mdAutenticacion.verificaToken, uploadController.retornaImagen);
    }

}

const uploadRoutes = new UploadRoutes();
export default uploadRoutes.router;