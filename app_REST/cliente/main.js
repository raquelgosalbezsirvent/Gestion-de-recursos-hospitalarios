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