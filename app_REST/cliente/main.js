var seccionActual = "login";
var id_gestor = null;

function cambiarSeccion(seccion){
document.getElementById(seccionActual).classList.remove("activa");
document.getElementById(seccionActual).classList.add("seccion");

document.getElementById(seccion).classList.remove("seccion");
document.getElementById(seccion).classList.add("activa");

seccionActual=seccion;
}



function entrar(){
    login = {
        usuario: document.getElementById("usuario-login").value,
        contrasenya: document.getElementById("contrasenya-login").value
    }

    rest.post("/api/gestores/login", login, function (estado, respuesta) {
        if (estado == 201) {
            cambiarSeccion("menu-principal");
            id_gestor = respuesta;
        }
        else if (estado == 403) {
            alert(respuesta.mensaje);
        }
        else {
            alert("Error desconocido");
        }
    });
}

function registrarse(){
    cambiarSeccion("datos-usuarios");
}

function registrarUsuario(){
    nuevoUsuario = {
        nombre: document.getElementById("nombre-registro").value,
        apellidos: document.getElementById("apellidos-registro").value,
        usuario: document.getElementById("usuario-registro").value,
        contrasenya: document.getElementById("contrasenya-registro").value
    }

    rest.post("/api/gestores", nuevoUsuario, function (estado, respuesta) {
        if (estado == 201) {
            alert(respuesta.mensaje);
            cambiarSeccion("menu-principal");
        }
        else if (estado == 409) {
            alert(respuesta.mensaje);
        }
        else {
            alert("Error desconocido");
        }
    });
}

function datosUsuario(){
    var usuario = document.getElementById("usuario").value;
    //...
}

function salir(){
    cambiarSeccion("login");

}


/*
function actualizarHospitales() { // actualiza la lista de hospitales
    rest.get("/api/hospitales", function (estado, respuesta) { //primer paso
        console.log("Estado:", estado, "Hospitales:", respuesta); //tercer paso
        if (estado != 200) {
            alert("Error cargando la lista de hospitales");
            return;
        }
        var lista = document.getElementById("hospitales");
        lista.innerHTML = "";
        for (var i = 0; i < respuesta.length; i++) {
            lista.innerHTML += "<li>" + respuesta[i].id + " - " + respuesta[i].nombre + " - " + respuesta[i].provincia + " <button onclick='eliminarHospital(" + respuesta[i].id + ")'>Borrar</button></li>";
        }
    });
}

function login() {
    var usuario = { //primer paso
        usuario: document.getElementById("usuario").value,
        contrasenya: document.getElementById("contrasenya").value
    };
    console.log(hospital);
    rest.post("/api/gestores/login", usuario, function (estado, respuesta) {
    console.log(respuesta)
        if (estado == 201) {
            console.log("traza0")
            actualizarHospitales();
        } else {
            alert("Error introduciendo nuevo usuario");
        }
    });
}

function eliminarHospital(idHospital) {
    rest.delete("/api/hospital/" + idHospital, function (estado, respuesta) { //primer paso
        if (estado == 200) {
           actualizarHospitales();
        } else {
            alert("No se ha podido borrar el hospital");
        }
    });
}

actualizarHospitales();
*/