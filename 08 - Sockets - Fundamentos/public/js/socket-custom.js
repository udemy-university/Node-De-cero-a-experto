var socket = io();

        socket.on('connect', function() {
            console.log("conectado al servidor");
        });

        // escuchar
        socket.on('disconnect', function() {
            console.log("perdimos conexion con el servidor");
        });

        // enviar información
        socket.emit('enviarMensaje', {
            usuario: 'Sandro',
            mensaje: 'Hola mundo'
        }, function(response) {
            console.log("Respuesta SV: ", response);
        });

        // escuchar información
        socket.on('enviarMensaje', function(mensaje) {
            console.log("Servidor: ", mensaje);
        });