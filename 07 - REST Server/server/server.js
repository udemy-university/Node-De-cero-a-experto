require('./config/config');

const express = require('express'); 
const mongoose = require('mongoose');

const app = express();


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {
    if(err) throw err;
    console.log("Base de datos conectada.");
});

app.listen(process.env.PORT, () => {
	console.log('Escuchando puerto: ', 3000);
})

/**
 * password: 123
 * si usaramos la API sola podemos automatizar configurar el token en las variables de entorno del postman.
 */