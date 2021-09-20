// Comprobamos la conexion
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hay conexion');
})

module.exports = router;