import { Request, Response } from 'express';
import pool from '../database';

class SettingsController {

// ==================================================
//       Backup
// ==================================================
public async backup(req: Request, res: Response) {

    console.log("pasa backup")

    pool.query(`mysqldump movi > movi.sql`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            res.json({ Mensaje: err });
            return;
        }
        
        res.json({ Mensaje: 'Ok' });
    })

}

}

const settingsController = new SettingsController;
export default settingsController;