import { Router } from 'express';

import multer from 'multer';
import path from 'path';
//const upload = multer({ dest: 'uploads/' });

var mdAutenticacion = require('../middlewares/autenticacion');

import uploadController from '../controllers/uploadController';

class UploadRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    });

    /*  //set allowed file types
    function checkFileType(
      file: Express.Multer.File,
      cb: multer.FileFilterCallback
    ) {
      //allowed file types
      const filetypes = /jpg|jpeg|png/;
      //get extension
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);

      //check file type
      if (extname && mimetype) {
        return cb(null, true);
      } else {
      }
    } */

    const upload = multer({
      storage,
      /*  fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
      }, */
    });

    this.router.put(
      '/cargar/:id/',

      mdAutenticacion.verificaToken,
      upload.single('imagen'),
      (req, res) => {
        //return image file path
        //res.send(`${req.file.path}`);
        //res.send(`/uploads/${filename}`);
        //console.log('body: ', req.body);
        console.log('files:', req.file);
        res.json(req.file?.path);
        //return res.sendStatus(200);
      }
    );
    this.router.get(
      '/retorna/:id/',
      mdAutenticacion.verificaToken,
      uploadController.retornaImagen
    );
  }
}

const uploadRoutes = new UploadRoutes();
export default uploadRoutes.router;
