/*
// Nombre fichero: index.js
// Fecha: 19/9/2021
// Autor: Jorge Grau Giannakakis
// Descripción: Se comprueba la conexion
*/

// Comprobamos la conexion
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hay conexion');
})

module.exports = router;