import { Sequelize } from "sequelize";
import env from "dotenv"
env.config();

const dbConnection = new Sequelize(process.env.DB_NAME, process.env.USER_DB, process.env.PASSWORD_DB,{
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    dialect: "mysql"
})


if(dbConnection){
    console.log("Conectado a la base de datos...");
}


export default dbConnection;