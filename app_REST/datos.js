var sanitarios = [
  { id: 1, nombre: "Ana", apellidos: "López García", usuario: "alopez", password: "ana123" },
  { id: 2, nombre: "Miguel", apellidos: "Santos Pérez", usuario: "msantos", password: "miguel123" },
  { id: 3, nombre: "Lucía", apellidos: "Navarro Ruiz", usuario: "lnavarro", password: "lucia123" }
];

var gestores = [
  { id: 1, nombre: "Raúl", apellidos: "Martínez Díaz", usuario: "rmartinez", password: "raul123" },
  { id: 2, nombre: "Elena", apellidos: "Serrano Gil", usuario: "eserrano", password: "elena123" },
  { id: 3, nombre: "admin", apellidos: "Raquel", usuario: "admin", password: "123" }
];

var ubicaciones = [
  { id: 1, nombre: "Almacén Central" },
  { id: 2, nombre: "Urgencias" },
  { id: 3, nombre: "UCI" },
  { id: 4, nombre: "Planta 1 - Pediatría" },
  { id: 5, nombre: "Planta 2 - Oncología" }
];

var categorias = [
  { id: 1, nombre: "Termómetros" },
  { id: 2, nombre: "Estetoscopios" },
  { id: 3, nombre: "Sillas de ruedas" },
  { id: 4, nombre: "Camillas" }
];

var modelos = [
  // Termómetros
  { id: 1, nombre: "ThermoFast T1", categoria: 1, horas_maximas: 24 },
  { id: 2, nombre: "ThermoPro X2", categoria: 1, horas_maximas: 24 },

  // Estetoscopios
  { id: 3, nombre: "Stetho Classic", categoria: 2, horas_maximas: 72 },
  { id: 4, nombre: "CardioScope Pro", categoria: 2, horas_maximas: 72 },

  // Sillas
  { id: 5, nombre: "WheelGo Basic", categoria: 3, horas_maximas: 12 },
  { id: 6, nombre: "WheelGo Plus", categoria: 3, horas_maximas: 12 },

  // Camillas
  { id: 7, nombre: "Camilla Estándar", categoria: 4, horas_maximas: 96 },
  { id: 8, nombre: "Camilla Premium", categoria: 4, horas_maximas: 96 }
];

var recursos = [
  { id: 1, modelo: 1, ubicacion: 4, numero_serie: "TF-T1-0001", estado: 0 },
  { id: 2, modelo: 2, ubicacion: 2, numero_serie: "TP-T1-0001", estado: 0 },
  { id: 3, modelo: 3, ubicacion: 1, numero_serie: "SC-CL-0100", estado: 0 },
  { id: 4, modelo: 5, ubicacion: 1, numero_serie: "WG-B-2001", estado: 2 },
  { id: 5, modelo: 7, ubicacion: 3, numero_serie: "C-E-7770", estado: 0 },
  { id: 6, modelo: 8, ubicacion: 5, numero_serie: "C-P-8891", estado: 1 }
];


var reservas = [
  // Recurso 2
  {
    id: 1,
    recurso: 2,
    sanitario: 1,
    horas_estimadas: 4,
    fecha_peticion: new Date("2026-02-09T09:10:00"),
    fecha_inicio: new Date("2026-02-09T10:00:00"),
    fecha_fin: null
  },

  // Recurso 5
  {
    id: 2,
    recurso: 5,
    sanitario: 2,
    horas_estimadas: 2,
    fecha_peticion: new Date("2026-02-07T08:30:00"),
    fecha_inicio: new Date("2026-02-07T09:00:00"),
    fecha_fin: null
  },

  // Recurso 5
  {
    id: 3,
    recurso: 5,
    sanitario: 3,
    horas_estimadas: 6,
    fecha_peticion: new Date("2026-02-08T12:15:00"),
    fecha_inicio: null,
    fecha_fin: null
  },

  // Recurso 1
  {
    id: 4,
    recurso: 1,
    sanitario: 3,
    horas_estimadas: 3,
    fecha_peticion: new Date("2026-02-01T09:00:00"),
    fecha_inicio: new Date("2026-02-01T10:00:00"),
    fecha_fin: new Date("2026-02-01T12:30:00")
  },

  // Recurso 4
  {
    id: 5,
    recurso: 4,
    sanitario: 1,
    horas_estimadas: 2,
    fecha_peticion: new Date("2026-01-15T11:45:00"),
    fecha_inicio: new Date("2026-01-15T12:00:00"),
    fecha_fin: new Date("2026-01-15T13:20:00")
  }
];


var resenyas = [
  {
    id: 1,
    recurso: 1,
    sanitario: 3,
    fecha: new Date("2026-02-02T10:10:00"),
    valor: 5,
    descripcion: "Ligera y cómoda. Sencillos cambios posturales."
  },
  {
    id: 2,
    recurso: 5,
    sanitario: 2,
    fecha: new Date("2026-02-07T18:05:00"),
    valor: 3,
    descripcion: "Funciona bien, pero el soporte estaba algo suelto."
  },
  {
    id: 3,
    recurso: 4,
    sanitario: 1,
    fecha: new Date("2026-01-16T09:20:00"),
    valor: 4,
    descripcion: "Cómoda, aunque el freno necesita ajuste."
  }
];

module.exports.ges=gestores
module.exports.san=sanitarios
module.exports.ubi=ubicaciones
module.exports.cat=categorias
module.exports.mod=modelos
module.exports.rec=recursos
module.exports.resny=resenyas
module.exports.resv=reservas