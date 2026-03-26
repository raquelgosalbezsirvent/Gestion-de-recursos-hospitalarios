var app = rpc("localhost", "gestion_pacientes");

var obtenerCategorias = app.procedure("obtenerCategorias"); 
var obtenerModelos = app.procedure("obtenerModelos");
var loginSanitario = app.procedure("loginSanitario"); 
var crearSanitario = app.procedure("crearSanitario"); 
var actualizarSanitario = app.procedure("actualizarSanitario"); 
var obtenerSanitario = app.procedure("obtenerSanitario"); 
var obtenerRecursos = app.procedure("obtenerRecursos"); 
var tiempoPendiente = app.procedure("tiempoPendiente"); 
var obtenerReservas = app.procedure("obtenerReservas"); 
var obtenerResenyas = app.procedure("obtenerResenyas"); 
var crearResenya = app.procedure("crearResenya"); 
var reservarRecurso = app.procedure("reservarRecurso"); 
var cancelarReserva = app.procedure("cancelarReserva"); 
var iniciarReserva = app.procedure("iniciarReserva"); 
var finalizarReserva = app.procedure("finalizarReserva"); 
var obtenerRecurso = app.procedure("obtenerRecurso"); 

var seccionActual = "login";
var id_sanitario = null;

var id_recurso_resenya = null;

var ahora = new Date("2026-02-25T12:30:00"); // se ha definido una hora fija para que se puedan ver correctamente todos los tipos de reservas (pendientes, activas, retardadas, etc.)

function cambiarSeccion(seccion){
    if (seccion == "menu-principal") {
        actualizarReservasPendientes();
        actualizarReservasRealizadas();
    }
    document.getElementById(seccionActual).classList.remove("mostrar");
    document.getElementById(seccionActual).classList.add("ocultar");

    document.getElementById(seccion).classList.remove("ocultar");
    document.getElementById(seccion).classList.add("mostrar");

    seccionActual=seccion;

    document.getElementById("ahora").innerHTML = formatearFecha(ahora);
}

function entrar(){
    var usuario = document.getElementById("usuario-login").value;
    var password = document.getElementById("password-login").value;

    loginSanitario(usuario, password, function (idSanitario) {
        if (idSanitario != null) {
            id_sanitario = idSanitario;

            obtenerSanitario(idSanitario, function(sanitario) {
                if (sanitario != null) {
                    document.getElementById("bienvenida").innerHTML = "Bienvenido/a " + sanitario.nombre + " " + sanitario.apellidos;
                }
                else {
                    document.getElementById("bienvenida").innerHTML = "No se ha podido obtener el Sanitario";
                }
                cambiarSeccion("menu-principal");
            });
        }
        else {
            alert("No se pudo obtener el sanitario");
        }
    });
}

function registro_usuario() {
    document.getElementById("nombre-registro").value = "";
    document.getElementById("apellidos-registro").value = "";
    document.getElementById("usuario-registro").value = "";
    document.getElementById("password-registro").value = "";
    document.getElementById("password-registro").placeholder = "";

    document.getElementById("boton-datos-usuario").onclick = function(){ gestionUsuario('registro'); };
    document.getElementById("boton-datos-usuario").textContent = "Registrar";

    document.getElementById("boton-datos-usuario-cancelar").onclick = function() { cambiarSeccion("login"); };

    cambiarSeccion("datos-usuarios");
}

function datos_usuario() {
    obtenerSanitario(id_sanitario, function (sanitario) {
        if (sanitario != null) {
            document.getElementById("nombre-registro").value = sanitario.nombre;
            document.getElementById("apellidos-registro").value = sanitario.apellidos;
            document.getElementById("usuario-registro").value = sanitario.usuario;
            document.getElementById("password-registro").value = "";
            document.getElementById("password-registro").placeholder = "Dejar en blanco para mantener la actual";

            document.getElementById("boton-datos-usuario").onclick = function(){ gestionUsuario('edicion'); };
            document.getElementById("boton-datos-usuario").textContent = "Editar";

            document.getElementById("boton-datos-usuario-cancelar").onclick = function() { cambiarSeccion("menu-principal"); };

            cambiarSeccion("datos-usuarios");
        }
        else {
            document.getElementById("nombre-registro").value = "Error";
        }
    })
}

function gestionUsuario(tipo_gestion){
    var usuario = {
        nombre: document.getElementById("nombre-registro").value,
        apellidos: document.getElementById("apellidos-registro").value,
        usuario: document.getElementById("usuario-registro").value,
        password: document.getElementById("password-registro").value
    }

    if (tipo_gestion == "registro") {
        crearSanitario(usuario, function (idSanitario) {
            if (idSanitario != null) {
                alert("Usuario creado correctamente");
                cambiarSeccion("login");
            }
            else {
                alert("El usuario ya existe");
            }
        });
    }
    else if (tipo_gestion == "edicion") {
        actualizarSanitario(id_sanitario, usuario, function(idSanitario) {
            if (idSanitario != null) {
                alert("Datos actualizados correctamente");
                cambiarSeccion("menu-principal");
            }
            else {
                alert("El usuario está repetido o no se encuentra");
            }
        });
        
    }
}

function actualizarSelect(sufijo){
    obtenerCategorias(function(categorias) {
        if (categorias.length > 0) {
            var selectCategorias = document.getElementById("categoria"+sufijo);
            selectCategorias.innerHTML = ""; // Limpiar el select antes de añadir nuevas opciones
            
            selectCategorias.innerHTML = '<option value="default"> </option>';

            for (var i = 0; i < categorias.length; i++) {
                selectCategorias.innerHTML += '<option value="' + categorias[i].id + '">' + categorias[i].nombre + '</option>';
            }
        }
    });

    obtenerModelos( function(modelos) {
        if (modelos.length > 0) {
            var selectModelos = document.getElementById("modelo"+sufijo);
            selectModelos.innerHTML = ""; // Limpiar el select antes de añadir nuevas opciones
            
            selectModelos.innerHTML = '<option value="default"> </option>';

            for (var i = 0; i < modelos.length; i++) {
                selectModelos.innerHTML += '<option value="' + modelos[i].id + '">' + modelos[i].nombre + '</option>';
            }
        }
    });
}

function filtrarModelo(sufijo) {

    var filtroCategoria = document.getElementById("categoria" + sufijo).value;

    obtenerModelos(function(modelos) {
        if (modelos.length > 0) {
            var selectModelos = document.getElementById("modelo" + sufijo);
            
            selectModelos.innerHTML = '<option value="default"> </option>';

            if (filtroCategoria == "default") {
                for (var i = 0; i < modelos.length; i++) {
                    selectModelos.innerHTML += '<option value="' + modelos[i].id + '">' + modelos[i].nombre + '</option>';
                }
            }
            else {
                for (var i = 0; i < modelos.length; i++) {
                    if (modelos[i].categoria == Number(filtroCategoria)) {
                        selectModelos.innerHTML += '<option value="' + modelos[i].id + '">' + modelos[i].nombre + '</option>';
                    }
                }
            }

            if (sufijo == "-nueva-reserva") {
                document.getElementById("tabla-nueva-reserva").innerHTML = "";
            }
        }
    });
}

function actualizarReservasPendientes() {
    var tablaReservasPendientes = document.getElementById("tabla-reservas-pendientes");
    tablaReservasPendientes.innerHTML = ""; // vaciar la tabla

    obtenerReservas(id_sanitario, function (reservas) {
        if (reservas.length > 0) {
            var reservas_pendientes = reservas.filter(function (r) { // se filtra por reservas pendientes, es decir, que no haya empezado
                return r.fecha_inicio == null;
            });

            reservas_pendientes.sort(function (a, b) {
                return new Date(b.fecha_peticion).getTime() - new Date(a.fecha_peticion).getTime();
            });

            var filas = new Array(reservas_pendientes.length);
            var restantes = reservas_pendientes.length;

            for (let i = 0; i < reservas_pendientes.length; i++) {
                let reserva = reservas_pendientes[i];

                obtenerRecurso(reserva.recurso, function (datosRecurso) {
                    if (datosRecurso != null) {
                        var recurso = datosRecurso.recurso;
                        var disponible = datosRecurso.disponible;

                        tiempoPendiente(recurso.id, function (tiempo) {
                            var tiempoTexto = formatearTiempoPendiente(tiempo, disponible);
                            var acciones = "";

                            if (tiempo == 0 && disponible) {
                                acciones += "<td><button class='boton-retirar' onclick='retirarRecurso(" + reserva.id + "," + true + ")'>Retirar</button></td>";
                            }
                            else {
                                acciones += "<td></td>";
                            }

                            acciones += "<td><button class='boton-cancelar' onclick='eliminarReserva(" + reserva.id + ")'>X</button></td>";

                            filas[i] =
                                "<tr>" +
                                    "<td>" + (recurso.categoria || "") + "</td>" +
                                    "<td>" + (recurso.modelo || "") + "</td>" +
                                    "<td>" + (recurso.numero_serie || "") + "</td>" +
                                    "<td>" + (recurso.ubicacion || "") + "</td>" +
                                    "<td>" + formatearFecha(reserva.fecha_peticion) + "</td>" +
                                    "<td>" + tiempoTexto + "</td>" +
                                    acciones +
                                "</tr>";

                            restantes--;
                            if (restantes === 0) {
                                tablaReservasPendientes.innerHTML = filas.join("");
                            }
                        });
                    }
                    else {
                        filas[i] = "";
                        restantes--;
                        if (restantes === 0) {
                            tablaReservasPendientes.innerHTML = filas.join("");
                        }
                    }
                });
            }
        }
        else {
            alert("No se tienen reservas pendientes a mostrar");
        }
    });
}

function actualizarReservasRealizadas() {
    var tablaReservasRealizadas = document.getElementById("tabla-reservas-realizadas");
    tablaReservasRealizadas.innerHTML = ""; // vaciar la tabla

    obtenerReservas(id_sanitario, function (reservas) {
        if (reservas.length > 0) {
            var reservas_realizadas = reservas.filter(function (r) { // se filtra por reservas ya iniciadas
                return r.fecha_inicio != null;
            });

            reservas_realizadas.sort(function (a, b) {
                return new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime();
            });

            var filas = new Array(reservas_realizadas.length);
            var restantes = reservas_realizadas.length;

            for (let i = 0; i < reservas_realizadas.length; i++) {
                let reserva = reservas_realizadas[i];

                obtenerRecurso(reserva.recurso, function (datosRecurso) {
                    if (datosRecurso != null) {
                        var recurso = datosRecurso.recurso;
                        var celdaFechaFin = "";
                        var botonResenya = "<button class='boton-resenya' onclick='abrirResenya(" + reserva.recurso + ", \"" + recurso.numero_serie + "\")'>Reseñar</button>";

                        if (reserva.fecha_fin == null) {
                            celdaFechaFin = "<button class='boton-devolver' onclick='devolverRecurso(" + reserva.id + ")'>Devolver</button>";
                        }
                        else {
                            celdaFechaFin = formatearFecha(reserva.fecha_fin);
                        }

                        filas[i] =
                            "<tr>" +
                                "<td>" + (recurso.categoria || "") + "</td>" +
                                "<td>" + (recurso.modelo || "") + "</td>" +
                                "<td>" + (recurso.numero_serie || "") + "</td>" +
                                "<td>" + reserva.horas_estimadas + "</td>" +
                                "<td>" + formatearFecha(reserva.fecha_inicio) + "</td>" +
                                "<td>" + celdaFechaFin + "</td>" +
                                "<td>" + botonResenya + "</td>" +
                            "</tr>";

                        restantes--;
                        if (restantes === 0) {
                            tablaReservasRealizadas.innerHTML = filas.join("");
                        }
                    }
                    else {
                        filas[i] = "";
                        restantes--;
                        if (restantes === 0) {
                            tablaReservasRealizadas.innerHTML = filas.join("");
                        }
                    }
                });
            }
        }
        else {
            alert("No se tienen reservas realizadas a mostrar");
        }
    });
}

function abrirResenya(idRecurso, numeroSerie) {
    id_recurso_resenya = idRecurso;

    document.getElementById("numero-serie-resenya").innerHTML = numeroSerie;
    document.getElementById("valoracion-resenya").value = 1;
    document.getElementById("texto-resenya").value = "";

    cambiarSeccion("resenya");
}

function guardarResenya() {
    var valoracion = Number(document.getElementById("valoracion-resenya").value);
    var texto = document.getElementById("texto-resenya").value;

    if (texto == "") {
        alert("Debes escribir un comentario");
        return;
    }

    crearResenya(id_recurso_resenya, id_sanitario, valoracion, texto, function(idResenya) {
        if (idResenya != null) {
            id_recurso_resenya = null;

            actualizarReservasPendientes();
            actualizarReservasRealizadas();
            cambiarSeccion("menu-principal");
        }
        else {
            alert("No se pudo guardar la reseña");
        }
    });
}

function cancelarResenya() {
    id_recurso_resenya = null;
    cambiarSeccion("menu-principal");
}

function retirarRecurso(id, conReserva) { // se llama con el idReserva o idRecurso en funcion de si tiene o no reserva
    if (conReserva) { // se tiene reserva (aparece en el menu principal)
        var idReserva = id;
        iniciarReserva(idReserva, function (ok) {
            if (ok) {
                actualizarReservasPendientes();
                actualizarReservasRealizadas();
            }
            else {
                alert("No se pudo iniciar la reserva");
            }
        });
    }
    else { // no se tiene reserva (se retira el recurso directamente desde Nueva Reserva)
        var idRecurso = id;
        var horas = document.getElementById("tiempo-est-uso-nueva-reserva").value;

        if (horas == "" || horas <= 0) {
            alert("Introduce un tiempo estimado de uso válido");
            return;
        }

        reservarRecurso(idRecurso, id_sanitario, Number(horas), function(idReserva) {
            if (idReserva != null) {
                iniciarReserva(idReserva, function(ok) {
                    if (ok) {
                        cambiarSeccion("menu-principal");
                    }
                    else {
                        alert("No se pudo retirar el recurso");
                    }
                });
            }
            else {
                alert("No se pudo realizar la reserva");
            }
        });
    }
}

function abrirnuevaReserva() {
    cambiarSeccion("nueva-reserva");
    actualizarSelect("-nueva-reserva");

    document.getElementById("tiempo-est-uso-nueva-reserva").value = "";
    document.getElementById("tabla-nueva-reserva").innerHTML = "";
}

function crearnuevaReserva(idRecurso) {
    var horas = document.getElementById("tiempo-est-uso-nueva-reserva").value;

    if (horas == "" || horas <= 0) {
        alert("Introduce un tiempo estimado de uso válido");
        return;
    }

    reservarRecurso(idRecurso, id_sanitario, Number(horas), function(idReserva) {
        if (idReserva != null) {
            alert("Recurso reservado con éxito");
            cambiarSeccion("menu-principal");
        }
        else {
            alert("No se pudo realizar la reserva");
        }
    });
}

function eliminarReserva(idReserva) {
    cancelarReserva(idReserva, function (ok) {
        if (ok) {
            actualizarReservasPendientes();
        }
        else {
            alert("No se pudo cancelar la reserva");
        }
    });
}

function devolverRecurso(idReserva) {
    finalizarReserva(idReserva, function (ok) {
        if (ok) {
            actualizarReservasPendientes();
            actualizarReservasRealizadas();
        }
        else {
            alert("No se pudo devolver el recurso");
        }
    });
}

function actualizarTablaNuevaReserva() {
    var tablaNuevasReservas = document.getElementById("tabla-nueva-reserva");
    tablaNuevasReservas.innerHTML = "";

    var idModelo = document.getElementById("modelo-nueva-reserva").value;

    if (idModelo != "default") {
        obtenerRecursos(idModelo, function(recursos) { // solo obtiene recursos operativos
            if (recursos.length > 0) {
                var filas = new Array(recursos.length);
                var restantes = recursos.length;

                for (let i = 0; i < recursos.length; i++) {
                    let recurso = recursos[i];

                    obtenerRecurso(recurso.id, function(datosRecurso) { // llamamos otra vez para poder saber con certeza que está disponible
                        if (datosRecurso != null) {
                            var disponible = datosRecurso.disponible;

                            tiempoPendiente(recurso.id, function(tiempo) {
                                obtenerResenyas(recurso.id, function(resenyas) {
                                    var valoracion = calcularValoracionMedia(resenyas);
                                    var accion = "";

                                    if (tiempo == 0 && disponible) { // está disponible de verdad
                                        accion = "<td><button onclick='retirarRecurso(" + recurso.id + "," + false + ")'>Retirar</button></td>";
                                    }
                                    else {
                                        accion = "<td><button onclick='crearnuevaReserva(" + recurso.id + ")'>Reservar</button></td>";
                                    }

                                    filas[i] =
                                        "<tr>" +
                                            "<td>" + recurso.numero_serie + "</td>" +
                                            "<td>" + recurso.ubicacion + "</td>" +
                                            "<td>" + formatearTiempoPendiente(tiempo, disponible) + "</td>" +
                                            "<td>" + valoracion + "</td>" +
                                            accion +
                                        "</tr>";

                                    restantes--;
                                    if (restantes === 0) {
                                        tablaNuevasReservas.innerHTML = filas.join("");
                                    }
                                });
                            });
                        }
                        else {
                            filas[i] = "";
                            restantes--;
                            if (restantes === 0) {
                                tablaNuevasReservas.innerHTML = filas.join("");
                            }
                        }
                    });
                }
            }
        });
    }
}

function calcularValoracionMedia(resenyas) {
    if (resenyas.length == 0) {
        return "Sin reseñas";
    }

    var suma = 0;
    for (var i = 0; i < resenyas.length; i++) {
        suma += resenyas[i].valor;
    }

    return (suma / resenyas.length).toFixed(2);
}

function salir(){
    document.getElementById("usuario-login").value = "";
    document.getElementById("password-login").value = "";
    id_sanitario = null;
    cambiarSeccion("login");
}

function formatearFecha(fecha) {
    if (fecha == "" || fecha == null) {
        return "";
    }

    var f = new Date(fecha);

    var dia = String(f.getDate()).padStart(2, "0");
    var mes = String(f.getMonth() + 1).padStart(2, "0");
    var anyo = String(f.getFullYear()).slice(-2);

    var horas = String(f.getHours()).padStart(2, "0");
    var minutos = String(f.getMinutes()).padStart(2, "0");
    var segundos = String(f.getSeconds()).padStart(2, "0");

    return dia + "/" + mes + "/" + anyo + "<br>" + horas + ":" + minutos + ":" + segundos;
}

function formatearTiempoPendiente(tiempo, disponible) {
    if (tiempo == 0 && disponible) {
        return "Disponible";
    }
    else if (tiempo == 0 && !disponible) {
        return "Pendiente de devolución";
    }
    else {
        return tiempo + " h";
    }
}