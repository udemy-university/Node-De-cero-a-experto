//objeto global que corre en toda la app de node siempre.
//	================
//	Puerto
//	================
process.env.PORT = process.send.PORT || 3000;

//	================
//	Entorno
//	================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//	================
//	Base de Datos
//	================
let urlDb;
if(process.env.NODE_ENV === 'dev') {
    urlDb = 'mongodb://localhost:27017/cafe';
} else {
    urlDb = 'mongodb+srv://sdezerio:Qi1r2voJvFWUaXBY@cluster0.mmqdb.mongodb.net/cafe';
}

process.env.URLDB = urlDb;

//	================
//	Vencimiento del Token
//	================

/**
 * 60 segundos
 * 60 minutos
 * 24 horas
 * 30 días
 */

// process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.CADUCIDAD_TOKEN = '48h';

//	================
//	SEED de autenticación
//	================

process.env.SEED = process.env.SEED || 'seed-desarrollo'; // seed en heroku configurar.

//	================
//	Google Client ID
//	================

process.env.CLIENT_ID = process.env.CLIENT_ID || '218758983312-cpnill04bcuk6rfuvd8pvcnlbn3l2p2n.apps.googleusercontent.com';
