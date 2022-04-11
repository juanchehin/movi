import express, { Application } from 'express';
import indexRoutes from './routes/indexRoutes';
import personasRoutes from './routes/personasRoutes';
import tiposdocumentosRoutes from './routes/tiposdocumentosRoutes';
import loginRoutes from './routes/loginRoutes';
import planesRoutes from './routes/planesRoutes';
import medicionesRoutes from './routes/medicionesRoutes';
import cajaRoutes from './routes/cajaRoutes';
import asistenciaRoutes from './routes/asistenciaRoutes';



class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', 3000);
    
        this.app.use(express.static('C:/movi/dist/movi'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        
    }

// ==================================================
//        RUTAS
// ==================================================
    routes(): void {


        this.app.use('/', indexRoutes);
        this.app.use('/api/personas', personasRoutes);
        this.app.use('/api/tiposdocumentos', tiposdocumentosRoutes);
        this.app.use('/api/login', loginRoutes);
        this.app.use('/api/planes', planesRoutes);
        this.app.use('/api/mediciones', medicionesRoutes);
        this.app.use('/api/caja', cajaRoutes);
        this.app.use('/api/asistencias', asistenciaRoutes);

    }

// ==================================================
//   Inicio el servicio en el puerto 3000
// ==================================================
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server en puerto', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();