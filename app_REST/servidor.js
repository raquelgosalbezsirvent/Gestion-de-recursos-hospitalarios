var express = require("express");
var app = express();

var datosServidor = require('./datos.js');
var gestores=datosServidor.ges
var sanitarios=datosServidor.san
var ubicaciones=datosServidor.ubi
var categorias=datosServidor.cat
var modelos=datosServidor.mod
var recursos=datosServidor.rec
var reservas=datosServidor.resv
var resenyas=datosServidor.resny

// siempre que el usuario escriba lo que ponga en appCliente, el servidor me va a devolver el contenido estatico (html, fotos, etc.) de lo que ponga en la carpeta cliente. si hay varios, devuelve index.html
app.use("/appCliente", express.static("cliente")); 
app.use(express.json()); 

console.log("Servidor escuchando en el puerto 3000 listo para recibir peticiones...");


app.get("/api/ubicaciones", function (req, res) {
    res.status(200).json(ubicaciones);
});

app.get("/api/categorias", function (req, res) {
    res.status(200).json(categorias);
});

app.get("/api/modelos", function (req, res) {
    res.status(200).json(modelos);
});

app.post("/api/gestores/login", function (req, res) {
    var usuario = req.body.usuario;
    var password = req.body.contrasenya;

    for (var i = 0; i < gestores.length; i++) {
        if (gestores[i].usuario == usuario && gestores[i].password == password) {
            res.status(201).json(gestores[i].id);
            return;
        }
    }
    res.status(403).json({ mensaje: "Credenciales incorrectas" });
});

app.post("/api/gestores", function (req, res) {
    var nuevoGestor = {
        id: gestores.length + 1,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        usuario: req.body.usuario,
        password: req.body.contrasenya        
    };

    for (var i = 0; i < gestores.length; i++) {
        if (gestores[i].usuario == nuevoGestor.usuario) {
            res.status(409).json({ mensaje: "El usuario ya existe" });
            return;
        }
    }

    gestores.push(nuevoGestor);
    res.status(201).json({mensaje: "Gestor creado correctamente"});
});


app.put("/api/gestores/:id", function (req, res) {
    var idGestor = parseInt(req.params.id);

    for (var i = 0; i < gestores.length; i++) {
        if (gestores[i].usuario == req.body.usuario && gestores[i].id != idGestor) {
            res.status(409).json({ mensaje: "El usuario indicado ya existe" });
            return;
        }
    }

    for (var i = 0; i < gestores.length; i++) {
        if (gestores[i].id == idGestor) {
            var actGestor = {
                id: idGestor,
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                usuario: req.body.usuario,
                password: req.body.contrasenya        
            };
            gestores[i] = actGestor;
            res.status(200).json({mensaje: "Gestor actualizado correctamente"});
            return;
        }
    }
    res.status(404).json({mensaje: "Gestor no encontrado"});
});

app.get("/api/gestores/:id", function (req, res) {
    var idGestor = parseInt(req.params.id);
    for (var i = 0; i < gestores.length; i++) {
        if (gestores[i].id == idGestor) {
            res.status(200).json(gestores[i]);
            return;
        }
    }
    res.status(404).json({mensaje: "Gestor no encontrado"});
});

app.get("/api/sanitarios/:id", function (req, res) {
    var idSanitario = parseInt(req.params.id);
    for (var i = 0; i < sanitarios.length; i++) {
        if (sanitarios[i].id == idSanitario) {
            res.status(200).json(sanitarios[i]);
            return;
        }
    }
    res.status(404).json({mensaje: "Sanitario no encontrado"});
});

app.get("/api/recursos", function (req, res) {
    //?categoria=idCategoria&modelo=idModelo&ubicacion=idUbicacion&estado=idEst
    console.log("Query length:", Object.keys(req.query));
    var recursos_salida = [];
    if(req.query.categoria == undefined && req.query.modelo == undefined && req.query.ubicacion == undefined && req.query.estado == undefined){
        recursos_salida = recursos;
    }
    else {
        for (var i = 0; i < recursos.length; i++) {
            if (recursos[i].categoria == req.query.categoria && recursos[i].modelo == req.query.modelo && recursos[i].ubicacion == req.query.ubicacion && recursos[i].estado == req.query.estado) {
                recursos_salida.push(recursos[i]);
            }
        }
    }
    res.status(200).json(recursos_salida);
});
app.listen(3000);