var express = require("express");
var app = express();

var datosServidor = require('./datos.js');
var medicos=datosServidor.med
var pacientes=datosServidor.pac
console.log(medicos[0].nom);
console.log(pacientes[0].edad);

console.log();

// siempre que el usuario escriba lo que ponga en appCliente, el servidor me va a devolver el contenido estatico (html, fotos, etc.) de lo que ponga en la carpeta cliente. si hay varios, devuelve index.html
app.use("/appCliente", express.static("cliente")); 
app.use(express.json()); 

var hospitales = [
    { id: 1, nombre: "Hospital de Alicante", provincia: "Alicante" },
    { id: 2, nombre: "Hospital de Elche", provincia: "Alicante" }
];
var siguienteHospital = 3;

app.get("/api/hospitales", function (req, res) {
    res.status(200).json(hospitales); //segundo paso
});



app.post("/api/hospitales", function (req, res) { //tercer paso
    console.log(req.body)
    var hosp = {
        id: siguienteHospital,
        nombre: req.body.nombre, // req.body equivale hospital
        provincia: req.body.provincia
    };
    console.log(hosp)
    hospitales.push(hosp);
    siguienteHospital++;
    res.status(201).json("Hospital creado"); //cuarto paso
});

app.delete("/api/hospital/:idHospital", function (req, res) { //hay un parámetro en la url
    var id = req.params.idHospital;
    for (var i = 0 ; i<hospitales.length ; i++) {
        if (hospitales[i].id == id) {
            hospitales.splice(i, 1);
            res.status(200).json("Hospital borrado"); //segundo paso
            return;
        }
    }
    res.status(404).json("No se ha encontrado el hospital a borrar");
});



app.listen(3000);