

// Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('coonect', function() {
    console.log("Conectado al server");
});

socket.on('discoonect', function() {
    console.log("Desconectado del server");
});

socket.on('estadoActual', function(response){ 
    label.text(response.actual);
});

$('button').on('click', function () {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});