import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import dbConnection from "./config/Database.js";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import ingresoRoutes from "./routes/ingresoRoutes.js";
import egresoRoutes from "./routes/egresoRoutes.js";
import conceptoRoutes from "./routes/conceptoRoutes.js";
import gastoFijoRoutes from "./routes/gastoFijoRoutes.js"
import calculoRoutes from "./routes/calculoRoutes.js"


dotenv.config();

const PORT = process.env.LOCAL_PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));


/*
// CREAR TABLAS BASE DE DATOS
import Usuario from "./models/UsuarioModel.js";
import Ingresos from "./models/IngresosModel.js";
import Egresos from "./models/EgresosModel.js";
import Concepto from "./models/ConceptoModel.js";
import GastosFijos from "./models/GastosFijosModel.js"
import session from "express-session";

// Un usuario tiene muchos ingresos
Usuario.hasMany(Ingresos, {
    foreignKey: "usuarioId",
    sourceKey: "id"
});

// Un ingreso pertenece a un usuario
Ingresos.belongsTo(Usuario, {
    foreignKey: "usuarioId",
    targetKey: "id"
});


// Un usuario tiene muchos egresos
Usuario.hasMany(Egresos, {
    foreignKey: "usuarioId",
    sourceKey: "id"
});

// Un egresos pertenece a un usuario
Egresos.belongsTo(Usuario, {
    foreignKey: "usuarioId",
    targetKey: "id"
});


// Un usuario tiene muchos conceptos
Usuario.hasMany(Concepto, {
    foreignKey: "usuarioId",
    sourceKey: "id"
});

// Un concepto pertenece a un usuario
Concepto.belongsTo(Usuario, {
    foreignKey: "usuarioId",
    targetKey: "id"
});


// Un usuario tiene muchos GastosFijos
Usuario.hasMany(GastosFijos, {
    foreignKey: "usuarioId",
    sourceKey: "id"
});

// Un GastosFijos pertenece a un usuario
GastosFijos.belongsTo(Usuario, {
    foreignKey: "usuarioId",
    targetKey: "id"
});

(async()=>{
    await dbConnection.sync()
})();   
*/

app.use("/api", usuarioRoutes);
app.use("/api", authRoutes);
app.use("/api", ingresoRoutes)
app.use("/api", egresoRoutes)
app.use("/api", conceptoRoutes)
app.use("/api", gastoFijoRoutes)
app.use("/api", calculoRoutes)


app.listen(PORT, () => {
    console.log(`Servidor conectado ${PORT}`);
})
