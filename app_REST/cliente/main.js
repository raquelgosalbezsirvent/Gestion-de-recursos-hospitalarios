var seccionActual = "login";
var id_gestor = null;

function cambiarSeccion(seccion){
    if (seccion == "menu-principal") {
        actualizarSelect("-filtro");
    }

    document.getElementById(seccionActual).classList.remove("mostrar");
    document.getElementById(seccionActual).classList.add("ocultar");

    document.getElementById(seccion).classList.remove("ocultar");
    document.getElementById(seccion).classList.add("mostrar");

    seccionActual=seccion;

}

function entrar(){
    login = {
        usuario: document.getElementById("usuario-login").value,
        password: document.getElementById("password-login").value
    }

    rest.post("/api/gestores/login", login, function (estado, respuesta) {
        if (estado == 201) {

            id_gestor = respuesta;    

            rest.get("/api/gestores/" + id_gestor, function(estado, respuesta){
                if (estado == 200) {
                    document.getElementById("bienvenida").innerHTML = "Bienvenido/a " + respuesta.nombre + " " + respuesta.apellidos;
                }
                else if (estado == 404) {
                    document.getElementById("bienvenida").innerHTML = respuesta.mensaje;
                }
                else {
                    document.getElementById("bienvenida").innerHTML = "Error desconocido";
                }
            })

            cambiarSeccion("menu-principal");
            
        }
        else if (estado == 403) {
            alert(respuesta.mensaje);
        }
        else {
            alert("Error desconocido");
        }
    });
}

function registro_usuario() {
    document.getElementById("nombre-registro").value = "";
    document.getElementById("apellidos-registro").value = "";
    document.getElementById("usuario-registro").value = "";
    document.getElementById("password-registro").value = "";

    document.getElementById("boton-datos-usuario").onclick = function(){ gestionUsuario('registro'); };
    document.getElementById("boton-datos-usuario").textContent = "Registrar";

    cambiarSeccion("datos-usuarios");
}

function edicion_usuario() {
    rest.get("/api/gestores/" + id_gestor, function (estado, respuesta) {
        if (estado == 200) {
            document.getElementById("nombre-registro").value = respuesta.nombre;
            document.getElementById("apellidos-registro").value = respuesta.apellidos;
            document.getElementById("usuario-registro").value = respuesta.usuario;
            document.getElementById("password-registro").value = respuesta.password;
        }
        else if (estado == 404) {
            document.getElementById("nombre-registro").value = respuesta.mensaje;
        }
    })

    document.getElementById("boton-datos-usuario").onclick = function(){ gestionUsuario('edicion'); };
    document.getElementById("boton-datos-usuario").textContent = "Editar";

    cambiarSeccion("datos-usuarios");
}

function gestionUsuario(tipo_gestion){
    usuario = {
        nombre: document.getElementById("nombre-registro").value,
        apellidos: document.getElementById("apellidos-registro").value,
        usuario: document.getElementById("usuario-registro").value,
        password: document.getElementById("password-registro").value
    }

    if (tipo_gestion == "registro") {
        rest.post("/api/gestores", usuario, function (estado, respuesta) {
            if (estado == 201) {
                alert(respuesta.mensaje);
                cambiarSeccion("login");
            }
            else if (estado == 409) {
                alert(respuesta.mensaje);
            }
            else {
                alert("Error desconocido");
            }
        });
    }
    else if (tipo_gestion == "edicion") {
        rest.put("/api/gestores/" + id_gestor, usuario, function(estado, respuesta) {
            if (estado == 200) {
                alert(respuesta.mensaje);
                cambiarSeccion("menu-principal");
            }
            else if (estado == 409) {
                alert(respuesta.mensaje);
            }
            else if (estado == 404) {
                alert(respuesta.mensaje);
            }
            else {
                alert("Error desconocido");
            }
        })
        
    }

    cambiarSeccion("datos-usuarios");
}

function actualizarSelect(sufijo){
    rest.get("/api/categorias", function(estado, respuesta) {
        if (estado == 200) {
            var categorias = respuesta;
            var selectCategorias = document.getElementById("categoria"+sufijo);
            selectCategorias.innerHTML = ""; // Limpiar el select antes de añadir nuevas opciones
            if (sufijo == "-filtro") {
                selectCategorias.innerHTML = '<option value="default">Todos</option>';
            }
            for (var i = 0; i < categorias.length; i++) {
                selectCategorias.innerHTML += '<option value="' + categorias[i].id + '">' + categorias[i].nombre + '</option>';
            }
        }
    });

    rest.get("/api/modelos", function(estado, respuesta) {
        if (estado == 200) {
            var modelos = respuesta;
            var selectModelos = document.getElementById("modelo"+sufijo);
            selectModelos.innerHTML = ""; // Limpiar el select antes de añadir nuevas opciones
            if (sufijo == "-filtro") {
                selectModelos.innerHTML = '<option value="default">Todos</option>';
            }
            for (var i = 0; i < modelos.length; i++) {
                selectModelos.innerHTML += '<option value="' + modelos[i].id + '">' + modelos[i].nombre + '</option>';
            }
        }
    });

    rest.get("/api/ubicaciones", function(estado, respuesta) {
        if (estado == 200) {
            var ubicaciones = respuesta;
            var selectUbicaciones = document.getElementById("ubicacion"+sufijo);
            selectUbicaciones.innerHTML = ""; // Limpiar el select antes de añadir nuevas opciones
            if (sufijo == "-filtro") {
                selectUbicaciones.innerHTML = '<option value="default">Todos</option>';
            }
            for (var i = 0; i < ubicaciones.length; i++) {
                selectUbicaciones.innerHTML += '<option value="' + ubicaciones[i].id + '">' + ubicaciones[i].nombre + '</option>';
            }
        }
    });

    var estados = {
        0: "Operativo",
        1: "De baja o defectuoso",
        2: "En mantenimiento"
    };

    var selectEstados = document.getElementById("estado"+sufijo);
    selectEstados.innerHTML = ""; // Limpiar el select antes de añadir nuevas opciones
    if (sufijo == "-filtro") {
        selectEstados.innerHTML = '<option value="default">Todos</option>';
    }
    for (var [clave, valor] of Object.entries(estados)) {
        selectEstados.innerHTML += '<option value="' + clave + '">' + valor + '</option>';
    }
}

function filtrarModelo() {

    var filtroCategoria = document.getElementById("categoria-filtro").value;

    rest.get("/api/modelos", function(estado, respuesta) {
        if (estado == 200) {
            var modelos = respuesta;
            var selectModelos = document.getElementById("modelo-filtro");
            selectModelos.innerHTML = '<option value="default">Todos</option>';

            if (filtroCategoria == "default") {
                for (var i = 0; i < modelos.length; i++) {
                    selectModelos.innerHTML += '<option value="' + modelos[i].id + '">' + modelos[i].nombre + '</option>';
                }
            }
            else {
                for (var i = 0; i < modelos.length; i++) {
                    if (modelos[i].categoria == filtroCategoria) {
                        selectModelos.innerHTML += '<option value="' + modelos[i].id + '">' + modelos[i].nombre + '</option>';
                    }
                }
            }
        }
    })
}

function actualizarTabla() {
    var params = [];

    var filtro_categoria = document.getElementById("categoria-filtro").value;
    if (filtro_categoria != "default") {
        params.push("categoria=" + encodeURIComponent(filtro_categoria));
    }

    filtro_modelo = document.getElementById("modelo-filtro").value;
    if (filtro_modelo != "default") {
        params.push("modelo=" + encodeURIComponent(filtro_modelo));
    }

    filtro_ubicacion = document.getElementById("ubicacion-filtro").value;
    if (filtro_ubicacion != "default") {
        params.push("ubicacion=" + encodeURIComponent(filtro_ubicacion));
    }

    filtro_estado = document.getElementById("estado-filtro").value;
    if (filtro_estado != "default") {
        params.push("estado=" + encodeURIComponent(filtro_estado));
    }

    var url = "/api/recursos" + (params.length ? "?" + params.join("&") : "");

    var tablaRecursos = document.getElementById("tabla-recursos");
    tablaRecursos.innerHTML = ""; // Limpiar la tabla antes de añadir nuevos recursos

    var recursos = [];
    rest.get(url, function(estado, respuesta) {
        if (estado == 200) {
            recursos = respuesta;
            
            // hay que concatenar las llamadas al servidor porque hay que esperar 
            // a las respuestas de cada una para pasar a la siguiente
            rest.get("/api/categorias", function(estado, respuesta) {
                if (estado == 200) {
                    var categorias = respuesta;
                    
                    rest.get("/api/modelos", function(estado, respuesta) {
                        if (estado == 200) {
                            var modelos = respuesta;

                            for (var i = 0; i < recursos.length; i++) {
                                for (var j = 0; j < modelos.length; j++) {
                                    if (recursos[i].modelo == modelos[j].id) {
                                        for (var k = 0; k < categorias.length; k++) {
                                            if (modelos[j].categoria == categorias[k].id) {
                                                recursos[i].categoria = categorias[k].nombre;
                                                break;
                                            }
                                        }
                                        recursos[i].modelo = modelos[j].nombre;
                                        break;
                                    }
                                }
                            }

                            rest.get("/api/ubicaciones", function(estado, respuesta) {
                                if (estado == 200) {
                                    var ubicaciones = respuesta;

                                    for (var i = 0; i < recursos.length; i++) {
                                        for (var j = 0; j < ubicaciones.length; j++) {
                                            if (recursos[i].ubicacion == ubicaciones[j].id) {
                                                recursos[i].ubicacion = ubicaciones[j].nombre;
                                                break;
                                            }
                                        }
                                    }

                                    var estados = {
                                        0: "Operativo",
                                        1: "De baja o defectuoso",
                                        2: "En mantenimiento"
                                    }

                                    for (var i = 0; i < recursos.length; i++) {
                                        recursos[i].estado = estados[recursos[i].estado];
                                    }

                                    for (var i = 0; i < recursos.length; i++) {
                                        tablaRecursos.innerHTML += "<tr><td>" + recursos[i].numero_serie + "</td><td>" + recursos[i].categoria + "</td><td>" + recursos[i].modelo + "</td><td>" + recursos[i].ubicacion + "</td><td>" + recursos[i].estado + "</td><td><button onclick='abrirRecurso(" + recursos[i].id + ")'>Abrir</button><button onclick='eliminarRecurso(" + recursos[i].id + ")'>X</button></td></tr>";
                                    }
                                }
                                else {
                                    alert("Error al cargar las ubicaciones");
                                }
                            });
                        }
                        else {
                            alert("Error al cargar los modelos");
                        }
                    });
                }
                else {
                    alert("Error al cargar las categorías");
                }
            });
        }
        else {
            alert("Error al cargar los recursos");
        }
    });
}

function abrirRecurso(id) {
}

function eliminarRecurso(id) {
    rest.delete("/api/recursos/" + id, function(estado, respuesta) {
        if (estado == 200) {
            alert(respuesta.mensaje);
            actualizarTabla();
        }
        else if (estado == 404) {
            alert(respuesta.mensaje);

        }
        else {
            alert("Error desconocido");
        }
    });
}

function nuevoRecurso() {
    cambiarSeccion("ficha-recurso");
    actualizarSelect("-ficha-recurso");
    
}



function salir(){
    console.log("salir")
    document.getElementById("usuario-login").value = "";
    document.getElementById("password-login").value = "";
    cambiarSeccion("login");

}