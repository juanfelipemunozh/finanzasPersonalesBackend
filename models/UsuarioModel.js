import { Sequelize } from "sequelize";
import dbConnection from "../config/Database.js";
import generarId from "../helper/generarId.js"

const { DataTypes } = Sequelize;

const Usuario = dbConnection.define("usuarios", {
    UUID: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nombreCompleto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    telefono: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "usuario",
        validate: {
            notEmpty: true
        }
    },
    confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
            notEmpty: true
        }
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: generarId()
    },
},{
    freezeTableName: true
})


export default Usuario;