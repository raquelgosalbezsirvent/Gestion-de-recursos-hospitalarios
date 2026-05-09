var WebSocket = require("ws");

var datosServidor = require("./datos.js");
var gestores = datosServidor.ges;
var sanitarios = datosServidor.san;
var ubicaciones = datosServidor.ubi;
var categorias = datosServidor.cat;
var modelos = datosServidor.mod;
var recursos = datosServidor.rec;
var reservas = datosServidor.resv;
var resenyas = datosServidor.resny;

var conexiones = [];

var servidorWS = new WebSocket.Server({ port: 3502 });

console.log("Servidor WS escuchando en el puerto 3502 listo para recibir avisos...");

servidorWS.on("connection", function(ws) {
    ws.logueado = false;
    ws.rol = null;
    ws.idUsuario = null;

    conexiones.push(ws);

    ws.on("message", function(mensaje) {
        recibirMensaje(ws, mensaje);
    });

    ws.on("close", function() {
        for (var i = 0; i < conexiones.length; i++) {
            if (conexiones[i] == ws) {
                conexiones.splice(i, 1);
                return;
            }
        }
    });
});

function recibirMensaje(ws, mensaje) {
    var datos = null;

    try {
        datos = JSON.parse(mensaje.toString());
    }
    catch (e) {
        return;
    }

    if (datos.tipo == "login") {
        registrarConexion(ws, datos);
        return;
    }

    if (!ws.logueado) {
        return;
    }

    if (datos.tipo == "aviso_recurso" && ws.rol == "gestor") {
        avisoNuevoRecurso(ws, datos.idRecurso);
    }
    else if (datos.tipo == "aviso_resenya" && ws.rol == "sanitario") {
        avisoNuevaResenya(ws, datos.idRecurso, datos.valoracion);
    }
    else if (datos.tipo == "aviso_reserva" && ws.rol == "sanitario") {
        avisoReserva(ws, datos.idReserva, datos.accion);
    }
}

function registrarConexion(ws, datos) {
    var idUsuario = parseInt(datos.idUsuario);

    if (datos.rol == "gestor") {
        var gestor = buscarGestor(idUsuario);

        if (gestor != null) {
            ws.logueado = true;
            ws.rol = "gestor";
            ws.idUsuario = idUsuario;
        }
    }
    else if (datos.rol == "sanitario") {
        var sanitario = buscarSanitario(idUsuario);

        if (sanitario != null) {
            ws.logueado = true;
            ws.rol = "sanitario";
            ws.idUsuario = idUsuario;
        }
    }
}

function avisoNuevoRecurso(ws, idRecurso) {
    var gestor = buscarGestor(ws.idUsuario);
    var recurso = buscarRecurso(parseInt(idRecurso));

    if (gestor == null || recurso == null) {
        return;
    }

    var aviso = {
        fecha: new Date(),
        origen: nombreCompleto(gestor),
        texto: "Se ha creado un nuevo recurso: " + textoRecurso(recurso) + ".",
        color: "azul"
    };

    for (var i = 0; i < conexiones.length; i++) {
        if (conexiones[i].logueado && conexiones[i].rol == "sanitario") {
            enviarAviso(conexiones[i], aviso);
        }
    }
}

function avisoNuevaResenya(ws, idRecurso, valoracion) {
    var sanitario = buscarSanitario(ws.idUsuario);
    var recurso = buscarRecurso(parseInt(idRecurso));

    if (sanitario == null || recurso == null) {
        return;
    }

    var aviso = {
        fecha: new Date(),
        origen: nombreCompleto(sanitario),
        texto: "Se ha creado una reseña para: " + textoRecurso(recurso) + ", con puntuación " + valoracion + ".",
        color: "verde"
    };

    for (var i = 0; i < conexiones.length; i++) {
        if (conexiones[i].logueado && conexiones[i].rol == "gestor") {
            enviarAviso(conexiones[i], aviso);
        }
    }
}

function avisoReserva(ws, idReserva, accion) {
    var sanitario = buscarSanitario(ws.idUsuario);
    var reserva = buscarReserva(parseInt(idReserva));

    if (sanitario == null || reserva == null) {
        return;
    }

    var recurso = buscarRecurso(reserva.recurso);

    if (recurso == null) {
        return;
    }

    var textoAccion = "";

    if (accion == "inicio") {
        textoAccion = "Se ha iniciado la reserva del ";
    }
    else if (accion == "fin") {
        textoAccion = "Se ha finalizado la reserva del ";
    }
    else {
        return;
    }

    var aviso = {
        fecha: new Date(),
        origen: nombreCompleto(sanitario),
        texto: textoAccion + textoRecurso(recurso) + ".",
        color: "rojo"
    };

    for (var i = 0; i < conexiones.length; i++) {
        if (conexiones[i].logueado && conexiones[i].rol == "sanitario") {
            if (sanitarioTieneReservaNoFinalizada(conexiones[i].idUsuario, recurso.id)) {
                enviarAviso(conexiones[i], aviso);
            }
        }
    }
}

function enviarAviso(ws, aviso) {
    if (ws.readyState == WebSocket.OPEN) {
        ws.send(JSON.stringify(aviso));
    }
}

function sanitarioTieneReservaNoFinalizada(idSanitario, idRecurso) {
    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].sanitario == idSanitario &&
            reservas[i].recurso == idRecurso &&
            reservas[i].fecha_fin == null) {
            return true;
        }
    }

    return false;
}

function textoRecurso(recurso) {
    var modelo = buscarModelo(recurso.modelo);

    if (modelo == null) {
        return "Recurso con código " + recurso.numero_serie;
    }

    var categoria = buscarCategoria(modelo.categoria);

    if (categoria == null) {
        return "Modelo " + modelo.nombre.toUpperCase() + " con código " + recurso.numero_serie;
    }

    return categoria.nombre.toUpperCase() + " modelo " + modelo.nombre.toUpperCase() + " con código " + recurso.numero_serie;
}

function nombreCompleto(usuario) {
    return usuario.nombre + " " + usuario.apellidos;
}

function buscarGestor(idGestor) {
    for (var i = 0; i < gestores.length; i++) {
        if (gestores[i].id == idGestor) {
            return gestores[i];
        }
    }

    return null;
}

function buscarSanitario(idSanitario) {
    for (var i = 0; i < sanitarios.length; i++) {
        if (sanitarios[i].id == idSanitario) {
            return sanitarios[i];
        }
    }

    return null;
}

function buscarRecurso(idRecurso) {
    for (var i = 0; i < recursos.length; i++) {
        if (recursos[i].id == idRecurso) {
            return recursos[i];
        }
    }

    return null;
}

function buscarReserva(idReserva) {
    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].id == idReserva) {
            return reservas[i];
        }
    }

    return null;
}

function buscarModelo(idModelo) {
    for (var i = 0; i < modelos.length; i++) {
        if (modelos[i].id == idModelo) {
            return modelos[i];
        }
    }

    return null;
}

function buscarCategoria(idCategoria) {
    for (var i = 0; i < categorias.length; i++) {
        if (categorias[i].id == idCategoria) {
            return categorias[i];
        }
    }

    return null;
}