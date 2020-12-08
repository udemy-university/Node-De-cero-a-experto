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