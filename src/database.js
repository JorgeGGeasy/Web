/*
// Nombre fichero: database.js
// Fecha: 19/9/2021
// Autor: Jorge Grau Giannakakis
// Descripción: Se crea la conexión con la base de datos
*/
const mysql = require('mysql');
const { promisify } = require('util');
const {database} = require('./keys');

const pool = mysql.createPool(database);

// Errores basicos y respuestas por terminal
pool.getConnection((err,connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');

        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');

        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');

        }
    }
    if(connection) connection.release();
    console.log('DB is connected');
    return;
});

// Promisify Pool Query
pool.query = promisify(pool.query);
module.exports = pool;