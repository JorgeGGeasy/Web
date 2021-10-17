/*
// Nombre fichero: medidas.js
// Fecha: 19/9/2021
// Autor: Jorge Grau Giannakakis
// Descripción: Se crean las paginas medidas y mapa
*/
const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/mapa', (req,res) =>{
    res.render('medidas/mapa');
});

router.get('/', async (req, res) => {
    
    // Limita las medidas que llegan
    const mediciones = await pool.query('SELECT * FROM mediciones ORDER BY fecha desc LIMIT 20');
    
    // Si llegan 0 medidas
    if(mediciones.length == 0){
        res.render('medidas/medidasSinDatos');
    }

    // Si hay alguna medida se muestran
    else{
        res.render('medidas/medidas', {mediciones});
    }

});
module.exports = router;