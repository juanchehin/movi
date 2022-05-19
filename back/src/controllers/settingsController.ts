import { Request, Response } from 'express';
import mysqldump from 'mysqldump';

class SettingsController {

// ==================================================
//       Backup
// ==================================================
public async backup(req: Request, res: Response) {

    try{
        await mysqldump({
            connection: {
                host: 'localhost',
                user: 'root',
                password: 'a',
                database: 'movi',
            },
            dumpToFile: './movi.sql',
        });
        res.json({ Mensaje: 'Ok' });
    }
    catch{
        res.json({ Mensaje: 'Error' });
    }
    


    
    
}

}

const settingsController = new SettingsController;
export default settingsController;