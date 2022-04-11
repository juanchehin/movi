import { Router } from 'express';
const path = require('path');

class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/*', (req, res) => res.sendFile(path.join('C:/movi/build')));
    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;