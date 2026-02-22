var sanitarios = [
  { id: 1, nombre: "Ana", apellidos: "López García", usuario: "alopez", password: "ana123" },
  { id: 2, nombre: "Miguel", apellidos: "Santos Pérez", usuario: "msantos", password: "miguel123" },
  { id: 3, nombre: "Lucía", apellidos: "Navarro Ruiz", usuario: "lnavarro", password: "lucia123" }
];

var gestores = [
  { id: 1, nombre: "Raúl", apellidos: "Martínez Díaz", usuario: "rmartinez", password: "raul123" },
  { id: 2, nombre: "Elena", apellidos: "Serrano Gil", usuario: "eserrano", password: "elena123" },
  { id: 3, nombre: "Raquel", apellidos: "Gosálbez Sirvent", usuario: "admin", password: "123" }
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
  { id: 2, modelo: 2, ubicacion: 2, numero_serie: "TP-T1-0001", estado: 1 },
  { id: 3, modelo: 3, ubicacion: 1, numero_serie: "SC-CL-0100", estado: 0 },
  { id: 4, modelo: 5, ubicacion: 1, numero_serie: "WG-B-2001", estado: 2 },
  { id: 5, modelo: 7, ubicacion: 3, numero_serie: "C-E-7770", estado: 0 },
  { id: 6, modelo: 8, ubicacion: 5, numero_serie: "C-P-8891", estado: 1 },
  { id: 7, modelo: 1, ubicacion: 2, numero_serie: "TF-T1-0002", estado: 2 },
  { id: 8, modelo: 2, ubicacion: 3, numero_serie: "TP-X2-0002", estado: 0 },
  { id: 9, modelo: 3, ubicacion: 4, numero_serie: "SC-CL-0101", estado: 1 },
  { id: 10, modelo: 4, ubicacion: 5, numero_serie: "CS-PRO-0001", estado: 2 },
  { id: 11, modelo: 5, ubicacion: 1, numero_serie: "WG-B-2002", estado: 0 },
  { id: 12, modelo: 6, ubicacion: 2, numero_serie: "WG-P-3001", estado: 1 },
  { id: 13, modelo: 7, ubicacion: 2, numero_serie: "C-E-7771", estado: 2 },
  { id: 14, modelo: 8, ubicacion: 3, numero_serie: "C-P-8892", estado: 0 }
];


var reservas = [
  { id: 1,  recurso: 2, sanitario: 1, horas_estimadas: 4, fecha_peticion: new Date("2026-02-09T09:10:00"), fecha_inicio: new Date("2026-02-09T10:00:00"), fecha_fin: null},
  { id: 2,  recurso: 5, sanitario: 2, horas_estimadas: 2, fecha_peticion: new Date("2026-02-07T08:30:00"), fecha_inicio: new Date("2026-02-07T09:00:00"),fecha_fin: null},
  { id: 3,  recurso: 5, sanitario: 3, horas_estimadas: 6, fecha_peticion: new Date("2026-02-08T12:15:00"), fecha_inicio: null,  fecha_fin: null},
  { id: 4,  recurso: 1, sanitario: 3, horas_estimadas: 3, fecha_peticion: new Date("2026-02-01T09:00:00"), fecha_inicio: new Date("2026-02-01T10:00:00"), fecha_fin: new Date("2026-02-01T12:30:00")},
  { id: 5,  recurso: 4, sanitario: 1, horas_estimadas: 2, fecha_peticion: new Date("2026-01-15T11:45:00"), fecha_inicio: new Date("2026-01-15T12:00:00"), fecha_fin: new Date("2026-01-15T13:20:00")},
  { id: 6,  recurso: 1, sanitario: 1, horas_estimadas: 2, fecha_peticion: new Date("2026-02-03T09:05:00"), fecha_inicio: new Date("2026-02-03T10:00:00"), fecha_fin: new Date("2026-02-03T11:40:00") },
  { id: 7,  recurso: 1, sanitario: 2, horas_estimadas: 3, fecha_peticion: new Date("2026-02-05T08:20:00"), fecha_inicio: new Date("2026-02-05T09:00:00"), fecha_fin: null },
  { id: 8,  recurso: 2, sanitario: 2, horas_estimadas: 1, fecha_peticion: new Date("2026-02-10T12:10:00"), fecha_inicio: new Date("2026-02-10T13:00:00"), fecha_fin: new Date("2026-02-10T13:50:00") },
  { id: 9,  recurso: 2, sanitario: 3, horas_estimadas: 5, fecha_peticion: new Date("2026-02-11T09:40:00"), fecha_inicio: null, fecha_fin: null },
  { id: 10, recurso: 2, sanitario: 1, horas_estimadas: 2, fecha_peticion: new Date("2026-02-12T07:55:00"), fecha_inicio: new Date("2026-02-12T08:30:00"), fecha_fin: null },
  { id: 11, recurso: 3, sanitario: 1, horas_estimadas: 4, fecha_peticion: new Date("2026-02-04T10:00:00"), fecha_inicio: new Date("2026-02-04T11:00:00"), fecha_fin: new Date("2026-02-04T14:30:00") },
  { id: 12, recurso: 3, sanitario: 3, horas_estimadas: 2, fecha_peticion: new Date("2026-02-06T11:15:00"), fecha_inicio: new Date("2026-02-06T12:00:00"), fecha_fin: null },
  { id: 13, recurso: 4, sanitario: 2, horas_estimadas: 3, fecha_peticion: new Date("2026-01-20T08:45:00"), fecha_inicio: new Date("2026-01-20T09:15:00"), fecha_fin: new Date("2026-01-20T12:10:00") },
  { id: 14, recurso: 4, sanitario: 3, horas_estimadas: 1, fecha_peticion: new Date("2026-02-02T13:05:00"), fecha_inicio: null, fecha_fin: null },
  { id: 15, recurso: 5, sanitario: 1, horas_estimadas: 2, fecha_peticion: new Date("2026-02-09T08:10:00"), fecha_inicio: new Date("2026-02-09T09:00:00"), fecha_fin: new Date("2026-02-09T10:35:00") },
  { id: 16, recurso: 5, sanitario: 2, horas_estimadas: 8, fecha_peticion: new Date("2026-02-10T16:00:00"), fecha_inicio: new Date("2026-02-10T17:00:00"), fecha_fin: null },
  { id: 17, recurso: 5, sanitario: 3, horas_estimadas: 3, fecha_peticion: new Date("2026-02-12T09:30:00"), fecha_inicio: null, fecha_fin: null },
  { id: 18, recurso: 6, sanitario: 1, horas_estimadas: 2, fecha_peticion: new Date("2026-02-01T08:30:00"), fecha_inicio: new Date("2026-02-01T09:00:00"), fecha_fin: new Date("2026-02-01T10:20:00") },
  { id: 19, recurso: 6, sanitario: 2, horas_estimadas: 6, fecha_peticion: new Date("2026-02-08T14:10:00"), fecha_inicio: new Date("2026-02-08T15:00:00"), fecha_fin: null },
  { id: 20, recurso: 7, sanitario: 3, horas_estimadas: 1, fecha_peticion: new Date("2026-02-13T09:00:00"), fecha_inicio: new Date("2026-02-13T09:30:00"), fecha_fin: new Date("2026-02-13T10:20:00") },
  { id: 21, recurso: 7, sanitario: 1, horas_estimadas: 3, fecha_peticion: new Date("2026-02-14T10:05:00"), fecha_inicio: null, fecha_fin: null },
  { id: 22, recurso: 8, sanitario: 2, horas_estimadas: 2, fecha_peticion: new Date("2026-02-10T10:20:00"), fecha_inicio: new Date("2026-02-10T11:00:00"), fecha_fin: new Date("2026-02-10T12:10:00") },
  { id: 23, recurso: 8, sanitario: 3, horas_estimadas: 4, fecha_peticion: new Date("2026-02-11T17:35:00"), fecha_inicio: new Date("2026-02-11T18:00:00"), fecha_fin: null },
  { id: 24, recurso: 9, sanitario: 1, horas_estimadas: 1, fecha_peticion: new Date("2026-02-05T07:55:00"), fecha_inicio: new Date("2026-02-05T08:10:00"), fecha_fin: new Date("2026-02-05T09:00:00") },
  { id: 25, recurso: 9, sanitario: 2, horas_estimadas: 2, fecha_peticion: new Date("2026-02-06T09:25:00"), fecha_inicio: null, fecha_fin: null },
  { id: 26, recurso: 9, sanitario: 3, horas_estimadas: 3, fecha_peticion: new Date("2026-02-07T11:00:00"), fecha_inicio: new Date("2026-02-07T12:00:00"), fecha_fin: null },
  { id: 27, recurso: 10, sanitario: 1, horas_estimadas: 2, fecha_peticion: new Date("2026-02-03T12:00:00"), fecha_inicio: null, fecha_fin: null },
  { id: 28, recurso: 10, sanitario: 2, horas_estimadas: 1, fecha_peticion: new Date("2026-02-04T15:10:00"), fecha_inicio: null, fecha_fin: null },
  { id: 29, recurso: 11, sanitario: 2, horas_estimadas: 2, fecha_peticion: new Date("2026-02-08T09:00:00"), fecha_inicio: new Date("2026-02-08T10:00:00"), fecha_fin: new Date("2026-02-08T11:35:00") },
  { id: 30, recurso: 11, sanitario: 3, horas_estimadas: 5, fecha_peticion: new Date("2026-02-09T13:30:00"), fecha_inicio: new Date("2026-02-09T14:00:00"), fecha_fin: null },
  { id: 31, recurso: 12, sanitario: 1, horas_estimadas: 2, fecha_peticion: new Date("2026-02-10T08:05:00"), fecha_inicio: new Date("2026-02-10T08:45:00"), fecha_fin: new Date("2026-02-10T10:05:00") },
  { id: 32, recurso: 12, sanitario: 2, horas_estimadas: 3, fecha_peticion: new Date("2026-02-12T11:20:00"), fecha_inicio: null, fecha_fin: null },
  { id: 33, recurso: 13, sanitario: 3, horas_estimadas: 8, fecha_peticion: new Date("2026-02-01T15:00:00"), fecha_inicio: new Date("2026-02-01T16:00:00"), fecha_fin: new Date("2026-02-01T22:30:00") },
  { id: 34, recurso: 13, sanitario: 1, horas_estimadas: 2, fecha_peticion: new Date("2026-02-03T09:50:00"), fecha_inicio: null, fecha_fin: null },
  { id: 35, recurso: 14, sanitario: 2, horas_estimadas: 4, fecha_peticion: new Date("2026-02-06T07:40:00"), fecha_inicio: new Date("2026-02-06T08:15:00"), fecha_fin: new Date("2026-02-06T11:55:00") },
  { id: 36, recurso: 14, sanitario: 3, horas_estimadas: 6, fecha_peticion: new Date("2026-02-08T16:30:00"), fecha_inicio: new Date("2026-02-08T17:00:00"), fecha_fin: null },
  { id: 37, recurso: 2, sanitario: 2, horas_estimadas: 2, fecha_peticion: new Date("2026-02-15T09:15:00"), fecha_inicio: new Date("2026-02-15T10:00:00"), fecha_fin: new Date("2026-02-15T11:10:00") },
  { id: 38, recurso: 5, sanitario: 1, horas_estimadas: 1, fecha_peticion: new Date("2026-02-15T12:40:00"), fecha_inicio: null, fecha_fin: null },
  { id: 39, recurso: 9, sanitario: 3, horas_estimadas: 2, fecha_peticion: new Date("2026-02-14T18:10:00"), fecha_inicio: new Date("2026-02-14T18:30:00"), fecha_fin: new Date("2026-02-14T20:05:00") },
  { id: 40, recurso: 14, sanitario: 1, horas_estimadas: 3, fecha_peticion: new Date("2026-02-15T07:30:00"), fecha_inicio: null, fecha_fin: null }
];


var resenyas = [
  { id: 1, recurso: 1, sanitario: 3, fecha: new Date("2026-02-02T10:10:00"), valor: 5, descripcion: "Ligera y cómoda. Sencillos cambios posturales."},
  { id: 2, recurso: 5, sanitario: 2, fecha: new Date("2026-02-07T18:05:00"), valor: 3, descripcion: "Funciona bien, pero el soporte estaba algo suelto."},
  { id: 3, recurso: 4, sanitario: 1, fecha: new Date("2026-01-16T09:20:00"), valor: 4, descripcion: "Cómoda, aunque el freno necesita ajuste."},
  { id: 4,  recurso: 1, sanitario: 1, fecha: new Date("2026-02-04T12:00:00"), valor: 4, descripcion: "Buena estabilidad. Recomendable para traslados cortos." },
  { id: 5,  recurso: 1, sanitario: 2, fecha: new Date("2026-02-06T09:30:00"), valor: 5, descripcion: "Muy cómoda. Ajustes intuitivos." },
  { id: 6,  recurso: 2, sanitario: 1, fecha: new Date("2026-02-10T14:20:00"), valor: 4, descripcion: "Lectura rápida y consistente." },
  { id: 7,  recurso: 2, sanitario: 3, fecha: new Date("2026-02-12T09:10:00"), valor: 3, descripcion: "Correcto, aunque a veces tarda en estabilizar." },
  { id: 8,  recurso: 3, sanitario: 2, fecha: new Date("2026-02-04T15:00:00"), valor: 5, descripcion: "Sonido nítido. Muy útil en planta." },
  { id: 9,  recurso: 3, sanitario: 3, fecha: new Date("2026-02-06T12:40:00"), valor: 4, descripcion: "Cómodo y buen aislamiento. Bien." },
  { id: 10, recurso: 4, sanitario: 2, fecha: new Date("2026-01-21T10:10:00"), valor: 4, descripcion: "Rueda suave. Frenos aceptables." },
  { id: 11, recurso: 4, sanitario: 3, fecha: new Date("2026-02-02T15:35:00"), valor: 2, descripcion: "Necesita mantenimiento. Vibración en una rueda." },
  { id: 12, recurso: 5, sanitario: 1, fecha: new Date("2026-02-09T11:00:00"), valor: 5, descripcion: "Muy estable. Maniobrable incluso en pasillos estrechos." },
  { id: 13, recurso: 5, sanitario: 3, fecha: new Date("2026-02-12T18:50:00"), valor: 4, descripcion: "Buen rendimiento general. Freno algo duro." },
  { id: 14, recurso: 6, sanitario: 1, fecha: new Date("2026-02-01T11:10:00"), valor: 3, descripcion: "Funciona, pero se nota desgaste en la estructura." },
  { id: 15, recurso: 6, sanitario: 2, fecha: new Date("2026-02-08T20:20:00"), valor: 2, descripcion: "Defectos visibles. Conviene revisión." },
  { id: 16, recurso: 7,  sanitario: 3, fecha: new Date("2026-02-13T12:30:00"), valor: 4, descripcion: "Buen termómetro de apoyo. Ligero." },
  { id: 17, recurso: 8,  sanitario: 2, fecha: new Date("2026-02-10T12:20:00"), valor: 5, descripcion: "Muy preciso y rápido." },
  { id: 18, recurso: 9,  sanitario: 1, fecha: new Date("2026-02-05T09:30:00"), valor: 4, descripcion: "Correcto. Buen sonido, cómodo." },
  { id: 19, recurso: 10, sanitario: 2, fecha: new Date("2026-02-04T16:00:00"), valor: 1, descripcion: "En mantenimiento: no disponible cuando se necesitaba." },
  { id: 20, recurso: 11, sanitario: 2, fecha: new Date("2026-02-08T12:00:00"), valor: 4, descripcion: "Robusta. Buen apoyo para traslados." },
  { id: 21, recurso: 12, sanitario: 1, fecha: new Date("2026-02-10T10:30:00"), valor: 5, descripcion: "Muy cómoda y fácil de manejar." },
  { id: 22, recurso: 13, sanitario: 3, fecha: new Date("2026-02-02T09:00:00"), valor: 4, descripcion: "Camilla estable. Buena altura." },
  { id: 23, recurso: 14, sanitario: 2, fecha: new Date("2026-02-06T12:30:00"), valor: 5, descripcion: "Muy buena. Ruedas suaves y frenos firmes." },
  { id: 24, recurso: 14, sanitario: 1, fecha: new Date("2026-02-15T08:15:00"), valor: 4, descripcion: "Buen estado. Fácil de limpiar." },
  { id: 25, recurso: 12, sanitario: 3, fecha: new Date("2026-02-12T12:05:00"), valor: 3, descripcion: "Bien, aunque el asiento podría ser más acolchado." }
];

module.exports.ges=gestores
module.exports.san=sanitarios
module.exports.ubi=ubicaciones
module.exports.cat=categorias
module.exports.mod=modelos
module.exports.rec=recursos
module.exports.resny=resenyas
module.exports.resv=reservas