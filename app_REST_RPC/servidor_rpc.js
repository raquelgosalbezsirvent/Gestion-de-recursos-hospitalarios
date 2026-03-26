//Es necesario instalar en la carpeta del servidor los modulos cors y express

var rpc = require("./rpc.js"); //incorporamos la libreria

var datosServidor=require("./datos.js")
var gestores=datosServidor.ges
var sanitarios=datosServidor.san
var ubicaciones=datosServidor.ubi
var categorias=datosServidor.cat
var modelos=datosServidor.mod
var recursos=datosServidor.rec
var reservas=datosServidor.resv
var resenyas=datosServidor.resny

console.log("Servidor RPC escuchando en el puerto 3501 listo para recibir peticiones...");

var ids_gestores = gestores.length + 1;
var ids_sanitarios = sanitarios.length + 1;
var ids_recursos = recursos.length + 1;
var ids_reservas = reservas.length + 1;
var ids_resenyas = resenyas.length + 1;

var ahora = new Date("2026-02-25T12:30:00");

function obtenerCategorias(callback) {
    return callback(categorias);
}

function obtenerModelos(callback) {
    return callback(modelos);
}

function loginSanitario(usuario, password, callback) {
    for (var i = 0; i < sanitarios.length; i++) {
        if (sanitarios[i].usuario == usuario && sanitarios[i].password == password) {
            return callback(sanitarios[i].id);
        }
    }
    return callback(null);
}

function crearSanitario(datosSanitario, callback) { 
    for (var i = 0; i < sanitarios.length; i++) {
        if (sanitarios[i].usuario == datosSanitario.usuario) {
            return callback(null); // el usuario está repetido
        }
    }

    var nuevoSanitario = {
        id: ids_sanitarios,
        nombre: datosSanitario.nombre,
        apellidos: datosSanitario.apellidos,
        usuario:  datosSanitario.usuario,
        password: datosSanitario.password
    }

    ids_sanitarios++;
    sanitarios.push(nuevoSanitario);
    return callback(nuevoSanitario.id);
}

function actualizarSanitario(idSanitario, datosSanitario, callback){
    for (var i = 0; i < sanitarios.length; i++) {
        if (sanitarios[i].usuario == datosSanitario.usuario && sanitarios[i].id != idSanitario) {
            return callback(null);
        }
    }

    for (var i = 0; i < sanitarios.length; i++) {
        if (sanitarios[i].id == idSanitario) {
            sanitarios[i].nombre = datosSanitario.nombre;
            sanitarios[i].apellidos = datosSanitario.apellidos;
            sanitarios[i].usuario = datosSanitario.usuario;

            if (datosSanitario.password != "") { // se comprueba que se ha cambiado la contraseña
                sanitarios[i].password = datosSanitario.password;
            }

            return callback(sanitarios[i].id);
        }
    }

    return callback(null);
}

function obtenerSanitario(idSanitario, callback) {
    for (var i = 0; i < sanitarios.length; i++) {
        if (sanitarios[i].id == idSanitario) {
            var sanitario = Object.assign({}, sanitarios[i]);
            delete sanitario.password;
            return callback(sanitario);
        }
    }
    return callback(null);
}

function obtenerRecursos(idModelo, callback) {
    var recursos_salida = [];

    for (var i = 0; i < recursos.length; i++) {
        if (recursos[i].modelo == idModelo && recursos[i].estado == 0) { // filtrar por recursos operativos
            var recurso_salida = Object.assign({}, recursos[i]);
            var modelo = modelos.find(m => m.id === recurso_salida.modelo);
            recurso_salida.modelo = modelo.nombre;

            var categoria = categorias.find(c => c.id === modelo.categoria);
            recurso_salida.categoria = categoria.nombre;

            var ubicacion = ubicaciones.find(u => u.id === recurso_salida.ubicacion);
            recurso_salida.ubicacion = ubicacion.nombre;
            recursos_salida.push(recurso_salida);
        }
    }

    return callback(recursos_salida);
}

function tiempoPendiente(idRecurso, callback) { // solo se tiene en cuenta el tiempo de la reserva activa actual, no se ha hecho una gestion de colas completa de forma intencional
    var reserva_activa = null;

    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].recurso == idRecurso &&
            reservas[i].fecha_inicio != null &&
            reservas[i].fecha_fin == null) { // solo va a haber una reserva activa del recurso
            reserva_activa = reservas[i];
            break;
        }
    }

    if (reserva_activa != null) {
        var finEstimada = reserva_activa.fecha_inicio.getTime() + reserva_activa.horas_estimadas * 60 * 60 * 1000;
        var tiempo_ms = finEstimada - ahora.getTime();
        var horas = tiempo_ms / (1000 * 60 * 60);

        if (horas < 0) {
            return callback(0);
        }
        else {
            return callback(Number(horas.toFixed(2)));
        }
    }
    else { // el recurso no se está usando ahora mismo
        return callback(0);
    }
}

function obtenerReservas(idSanitario, callback) {
    var reservas_salida = [];
    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].sanitario == idSanitario) {
            reservas_salida.push(reservas[i]);
        }
    }
    return callback(reservas_salida);
}

function obtenerResenyas(idRecurso, callback) {
    var resenyas_salida = [];
    for (var i = 0; i < resenyas.length; i++) {
        if (resenyas[i].recurso == idRecurso) {
            resenyas_salida.push(resenyas[i]);
        }
    }
    return callback(resenyas_salida);
}

function crearResenya(idRecurso, idSanitario, valoracion, descripcion, callback) {
    var sanitario = sanitarios.find(s => s.id === idSanitario);
    var recurso = recursos.find(r => r.id === idRecurso);

    if (sanitario == undefined || recurso == undefined) {
        return callback(null);
    }
    else {
        var idResenya = ids_resenyas;
        ids_resenyas++;
        resenyas.push({id: idResenya, recurso: recurso.id, sanitario: sanitario.id, fecha: new Date(), valor: valoracion, descripcion: descripcion});
        return callback (idResenya);
    }
}

function reservarRecurso(idRecurso, idSanitario, horasEstimadas, callback) {
    var sanitario = sanitarios.find(s => s.id === idSanitario);
    var recurso = recursos.find(r => r.id === idRecurso);

    if (sanitario == undefined || recurso == undefined) {
        return callback(null);
    }
    else {
        var idReserva = ids_reservas;
        ids_reservas++;
        reservas.push({id: idReserva, recurso: recurso.id, sanitario: sanitario.id, horas_estimadas: horasEstimadas, fecha_peticion: new Date(), fecha_inicio: null, fecha_fin: null});
        return callback (idReserva);
    }
}

function cancelarReserva(idReserva, callback) {
    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].id == idReserva) {
            reservas.splice(i, 1);
            return callback(true);
        }
    }
    
    return callback(false);
}

function iniciarReserva(idReserva, callback) {
    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].id == idReserva) {
            reservas[i].fecha_inicio = new Date();
            return callback(true);
        }
    }
    return callback(false);
}

function finalizarReserva(idReserva, callback) {
    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].id == idReserva) {
            reservas[i].fecha_fin = new Date();
            return callback(true);
        }
    }
    return callback(false);
}

function obtenerRecurso(idRecurso, callback) {
    var recurso = recursos.find(r => r.id == idRecurso);

    if (recurso == undefined) {
        return callback(null);
    }
    
    var recurso_salida = Object.assign({}, recurso);
    var modelo = modelos.find(m => m.id === recurso_salida.modelo);
    recurso_salida.modelo = modelo.nombre;

    var categoria = categorias.find(c => c.id === modelo.categoria);
    recurso_salida.categoria = categoria.nombre;

    var ubicacion = ubicaciones.find(u => u.id === recurso_salida.ubicacion);
    recurso_salida.ubicacion = ubicacion.nombre;

    var reserva = reservas.find(r => r.recurso == idRecurso && r.fecha_inicio != null && r.fecha_fin == null) // se busca reserva activa

    if (reserva == undefined) { // si no se encuentra, entonces esta disponible
        return callback({recurso: recurso_salida, disponible: true});
    }
    else {
        return callback({recurso: recurso_salida, disponible: false});
    }
}

var servidor = rpc.server(); // crear el servidor RPC
var app = servidor.createApp("gestion_pacientes"); // crear aplicación de RPC

//Registramos los procedimientos
app.registerAsync(obtenerCategorias);
app.registerAsync(obtenerModelos);
app.registerAsync(loginSanitario);
app.registerAsync(crearSanitario);
app.registerAsync(actualizarSanitario);
app.registerAsync(obtenerSanitario);
app.registerAsync(obtenerRecursos);
app.registerAsync(tiempoPendiente);
app.registerAsync(obtenerReservas);
app.registerAsync(obtenerResenyas);
app.registerAsync(crearResenya);
app.registerAsync(reservarRecurso);
app.registerAsync(cancelarReserva);
app.registerAsync(iniciarReserva);
app.registerAsync(finalizarReserva);
app.registerAsync(obtenerRecurso);