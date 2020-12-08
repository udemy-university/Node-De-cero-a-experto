const argv = require('yargs')
				.command('listar', 'Imprime en consola la tabla de multiplicar', {
					base: {
						demand: true,
						alias: 'b'
					},
					limite: {
						alias: 'l',
						default: 10
					}
				})
				.help()
				.argv;
const { crearArchivo } = require('./multiplicar/multiplicar');

let argv2 = process.argv; //variable global de node que se crear al iniciar el programa, en la posición argv se guardan los parámetros pasados por consola.
/*let parametro = argv[2];
let base = parametro.split('=')[1];
console.log(base);*/

console.log(argv);
console.log(argv2);

/*crearArchivo(base)
    .then(archivo => console.log(`Archivo creado: ${archivo}`))
    .catch(e => console.log(e));*/