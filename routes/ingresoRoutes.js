import express from "express";
import { eliminarIngreso, modificarIngreso, obtenerIngresos, obtenerUnIngreso, registrarIngreso } from "../controllers/IngresosController.js";
import checkAuth from "../middleware/authValidacion.js";

const router = express.Router();

router.post("/ingreso/", checkAuth, registrarIngreso);
router.get("/ingreso/", checkAuth, obtenerIngresos);
router.get("/ingreso/:id", checkAuth, obtenerUnIngreso);
router.put("/ingreso/:id", checkAuth, modificarIngreso);
router.delete("/ingreso/:id", checkAuth, eliminarIngreso)

export default router;

