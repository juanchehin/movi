import mysql from 'mysql2';

import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection(function(err, conn) {
    // Do something with the connection
    if (err) 
        throw console.log('Error de conexion en BD : ', err);
        conn.release(); 

     console.log('Base de datos conectada');
});

export default pool;
