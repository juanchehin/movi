import express, { Request, Response, Router } from 'express';
const app = express();
import pool from '../database';
const multer = require('multer');

class UploadController {
  // ==================================================
  //    fileUpload
  // ==================================================

  public async subirImagen(req: any, res: Response) {
    /* console.log('Req es:', req); */
    const id = req.params.id;

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: 'No hay ningún archivo',
      });
    }

    // Procesar la imagen...
    /* const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ['jpg', 'jpeg'];
    if (!extensionesValidas.includes(extensionArchivo)) {
      return res.status(400).json({
        ok: false,
        msg: 'No es una extensión permitida',
      });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${id}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, (err: any) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          ok: false,
          msg: 'Error al mover la imagen',
        });
      }

      // Actualizar base de datos
      // actualizarImagen( tipo, id, nombreArchivo );

      res.json({
        ok: true,
        msg: 'Archivo subido',
        nombreArchivo,
      });
    }); */
    /* let upload = multer({ dest: 'uploads/' });
    this.router.use(express.urlencoded({ extended: true }));

    this.router.put('/', upload.single('file'), (req: any, res) => {
      console.log(req.file);
    }); */
  }

  // ==================================================
  //        retornaImagen
  // ==================================================

  public async retornaImagen(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    pool.query(
      `call bsp_dame_tipodocumento('${id}')`,
      function (err: any, result: any, fields: any) {
        if (err) {
          console.log('error', err);
          return;
        }

        if (result.length > 0) {
          return res.json(result[0]);
        }
        res.status(404).json({ text: 'El tipoDoc no existe' });
      }
    );
  }
}

const uploadController = new UploadController();
export default uploadController;
