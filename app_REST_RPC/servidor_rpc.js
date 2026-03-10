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

var siguienteId = 2; 

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
    var nuevoSanitario = {
        id: sanitarios.length + 1,
        nombre: datosSanitario.nombre,
        apellidos: datosSanitario.apellidos,
        usuario:  datosSanitario.usuario,
        password: datosSanitario.password
    }

    for (var i = 0; i < sanitarios.length; i++) {
        if (sanitarios[i].usuario == datosSanitario.usuario) {
            return callback(null); // el usuario está repetido
        }
    }

    sanitarios.push(nuevoSanitario);
    return callback(nuevoSanitario.id);
}

function actualizarSanitario(idSanitario, datosSanitario, callback){
    for (var i = 0; i < sanitarios.length; i++) {
        if (sanitarios[i].usuario == datosSanitario.usuario && sanitarios[i].id != idSanitario) {
            return callback(null); // el usuario está repetido
        }
    }

    for (var i = 0; i < sanitarios.length; i++) {
        if (sanitarios[i].id == idSanitario) {
            var actSanitario = {
                id: idSanitario,
                nombre: datosSanitario.nombre,
                apellidos: datosSanitario.apellidos,
                usuario: datosSanitario.usuario,
                password: datosSanitario.password        
            };
            sanitarios[i] = actSanitario;
            return callback(actSanitario.id);
        }
    }

    return callback(null); // si el usuario no se encuentra
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
        if (recursos[i].modelo == idModelo && recursos[i].estado == 0) {
            recursos_salida.push(recursos[i]);
        }
    }

    return callback(recursos_salida);
}

function tiempoPendiente(idRecurso, callback) {
    var recurso = recursos.find(r => r.id === idRecurso);

    if (recurso == undefined) {
        return callback(null);
    }

    var disponible = true;

    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].recurso == recurso.id && reservas[i].fecha_fin == null) {
            var tiempo_ms = reservas[i].fecha_inicio - reservas[i].fecha_fin; // milisegundos

            var minutosTotales = Math.floor(tiempo_ms / 1000 / 60);
            var dias = Math.floor(minutosTotales / (60 * 24));
            var horas = Math.floor((minutosTotales % (60 * 24)) / 60);
            var minutos = minutosTotales % 60;

            disponible = false;
        }
    }

    if (disponible || (dias < 0 || horas < 0 || minutos < 0)) {
        return callback(0);
    }
    else {
        return callback({"dias": dias, "horas": horas, "minutos": minutos});
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
        var idResenya = resenyas.length + 1;;
        resenyas.push({id: idResenya, recurso: recurso.id, sanitario: sanitario.id, fecha: Date.now(), valor: valoracion, descripcion: descripcion});
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
        var idReserva = reservas.length + 1;;
        reservas.push({id: idReserva, recurso: recurso.id, sanitario: sanitario.id, horas_estimadas: horasEstimadas, fecha_peticion: Date.now(), fehca_inicio: null, fecha_fin: null});
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
            reservas[i].fecha_inicio = Date.now();
            return callback(true);
        }
    }
    return callback(false);
}

function finalizarReserva(idReserva, callback) {
    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].id == idReserva) {
            reservas[i].fecha_fin = Date.now();
            return callback(true);
        }
    }
    return callback(false);
}

function obtenerRecurso(idRecurso, callback) {
    var recurso = recursos.find(r => r.id === idRecurso);

    if (recurso == undefined) {
        return callback(null);
    }
    else {
        return callback(recurso);
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