import { Sequelize } from "sequelize";
import dbConnection from "../config/Database.js";
import Usuario from "./UsuarioModel.js";

const { DataTypes } = Sequelize;

const Egresos = dbConnection.define("egresos", {
    UUID: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    concepto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        } 
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    observacion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
},{
    freezeTableName: true
})


export default Egresos;