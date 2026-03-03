//Es necesario instalar en la carpeta del servidor los modulos cors y express

var rpc = require("./rpc.js"); //incorporamos la libreria

var datos=require("./datos.js")
var gestores=datosServidor.ges
var sanitarios=datosServidor.san
var ubicaciones=datosServidor.ubi
var categorias=datosServidor.cat
var modelos=datosServidor.mod
var recursos=datosServidor.rec
var reservas=datosServidor.resv
var resenyas=datosServidor.resny

var ids_gestores = gestores.length + 1;
var ids_sanitarios = sanitarios.length + 1;
var ids_recursos = recursos.length + 1;
var ids_reservas = reservas.length + 1;
var ids_resenyas = resenyas.length + 1;

console.log("Servidor RPC escuchando en el puerto 3501 listo para recibir peticiones...");

var siguienteId = 2; 

function obtenerCategorias(callback) {
    return callback(categorias);
}

function obtenerCategorias(callback) {
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
        id: ids_gestores++,
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
        var recurso = recursos[i];

        if (recurso.modelo == idModelo) {
            recursos_salida.push(recurso);
        }
    }

    return callback(recursos_salida);
}

//Función para eliminar un paciente. Retorna true o false 
function eliminarPaciente(id, callback) {
    for (var i = 0; i<pacientes.length ; i ++) {
        if (pacientes[i].id == id) {
            pacientes.splice(i, 1);
            return callback(true); // paciente borrado
        }
    }
    return callback(false); // paciente no borrado (no encontrado)
}

var servidor = rpc.server(); // crear el servidor RPC
var app = servidor.createApp("gestion_pacientes"); // crear aplicación de RPC

//Registramos los procedimientos
app.registerAsync(obtenerCategorias);
app.registerAsync(anyadirPaciente);
app.registerAsync(eliminarPaciente);


