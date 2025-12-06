import express from "express";
import { eliminarEgreso, modificarEgreso, obtenerEgresos, obtenerUnEgreso, registrarEgreso } from "../controllers/EgresosController.js";
import checkAuth from "../middleware/authValidacion.js";

const router = express.Router();

router.post("/egreso/", checkAuth, registrarEgreso);
router.get("/egreso/", checkAuth, obtenerEgresos);
router.get("/egreso/:id", checkAuth, obtenerUnEgreso)
router.put("/egreso/:id", checkAuth, modificarEgreso);
router.delete("/egreso/:id", checkAuth, eliminarEgreso);

export default router;