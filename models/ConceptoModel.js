import { Sequelize } from "sequelize";
import dbConnection from "../config/Database.js";
import Usuario from "./UsuarioModel.js";

const { DataTypes } = Sequelize;

const Concepto = dbConnection.define("conceptos", {
    UUID: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
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
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        references: {
            model: Usuario,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
})


export default Concepto;