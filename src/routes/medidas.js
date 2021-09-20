const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/mapa', (req,res) =>{
    res.render('medidas/mapa');
});

router.get('/', async (req, res) => {
    const mediciones = await pool.query('SELECT * FROM mediciones ORDER BY fecha desc');

    res.render('medidas/medidas', {mediciones});
});
module.exports = router;