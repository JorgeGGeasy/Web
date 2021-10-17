/*
// Nombre fichero: index.js
// Fecha: 19/9/2021
// Autor: Jorge Grau Giannakakis
// Descripción: Donde se hacen todos los ajustes de la web
*/
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

// Inicializaciones
const app = express();

// Ajustes

// Ponemos el puerto 4000
app.set('port', process.env.PORT || 4000);

// Especificamos las carpetas donde se guardan las vistas y handelbars como motor
app.set('views', path.join(__dirname,'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Rutas
app.use(require('./logica'));
app.use('/medidas', require('./logica/medidas'));

// Archivos publicos
app.use(express.static(path.join(__dirname, 'public')));

// Empezar el servidor
app.listen(app.get('port'), () => {
    console.log('Server en el puerto', app.get('port'));
});