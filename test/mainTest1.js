/*
// Nombre fichero: mainTest1.java
// Fecha: 19/9/2021
// Autor: Jorge Grau Giannakakis
// Descripción: Test de la logica
*/

const mysql = require('mysql');
const {database} = require('../src/keys');
const { Console, log } = require("console");
const { release } = require('os');

const pool = mysql.createPool(database);

describe( "Test 1: insertar una persona", function() {

// ....................................................
// ....................................................
it('Se abre la conexión con la base de datos', function(done) {    
    // Errores basicos y respuestas por terminal
    pool.getConnection((err,connection) => {
        if(connection) connection.release();
        console.log('DB is connected');
        done();
    });
});
// ....................................................
// ....................................................
it( "borrar todas las filas", async function() {
    const mediciones = await pool.query('DELETE FROM mediciones');
    if(mediciones.length == 0){
        //Borra base de datos
        release();   
    }
}) // it
// ....................................................
// ....................................................

it( "puedo insertar una persona", async function() {

    const mediciones = await pool.query('SELECT * FROM mediciones');
    const tamanio = mediciones.length;
    const id = null;
    const valor = 10;
    const latitud = 3;
    const longitud = 4;
    const fecha = "2011-12-18 13:17:17";
    const nuevaMedicion = {
        id, 
        valor, 
        latitud, 
        longitud, 
        fecha
    }
    await pool.query('INSERT INTO mediciones set ?', [nuevaMedicion]);
    
    const segundaMedicion = await pool.query('SELECT * FROM mediciones');
    
    if(tamanio < segundaMedicion.length){
     // Inserta medicion   
     release();
    }
}) // it

// ....................................................
// ....................................................
it( "cerrar conexión a la base de datos", async function() {
    pool.end();
    try {
        const mediciones = await pool.query('SELECT * FROM mediciones');
    } catch (error) {
        // Se cierra
        release();
    }
}) // it

}) // describe