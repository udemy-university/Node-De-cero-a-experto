/**
 *  Async Await
 */

//let getNombre = async() => {
//    return 'Sandro';
//}

let getNombre = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Fernando');
        }, 3000);
    })
}

let saludo = async() => {
    let nombre = await getNombre(); //el await me detiene la ejecución espera el resultado para seguir ejecutando. No puede haber un await sin async, pero si async sin await.
    return `Hola ${nombre}`;
}

/*getNombre()
    .then(nombre => {
        console.log(nombre);
    })
    .catch(e => {
        console.log("Error de async", e);
    })
*/
saludo()
    .then(mensaje => {
        console.log(mensaje);
    })