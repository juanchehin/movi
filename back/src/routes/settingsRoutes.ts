import { Router } from 'express';
import settingsController from '../controllers/settingsController';
var mdAutenticacion = require('../middlewares/autenticacion');

class SettingsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/backup',mdAutenticacion.verificaToken, settingsController.backup);
    }

}

const settingsRoutes = new SettingsRoutes();
export default settingsRoutes.router;