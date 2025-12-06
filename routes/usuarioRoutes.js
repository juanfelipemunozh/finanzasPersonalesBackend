import express from "express";
import { modificarUsuario, obtenerUsuario, registroUsuario } from "../controllers/UsuarioController.js";
import  checkAuth  from "../middleware/authValidacion.js";


const router = express.Router();

router.post("/usuario/registrar",  registroUsuario);
router.put("/usuario/modificar/:id", checkAuth, modificarUsuario)
router.get("/usuario/", checkAuth, obtenerUsuario)

export default router;