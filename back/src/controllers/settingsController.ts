import { Request, Response } from 'express';
import mysqldump from 'mysqldump';
import keys from '../keys';

class SettingsController {

// ==================================================
//       Backup
// ==================================================
public async backup(req: Request, res: Response) {

    try{
        await mysqldump({
            connection: {
                host: keys.database.host,
                user: keys.database.user!,
                password: keys.database.password!,
                database: keys.database.database!,
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