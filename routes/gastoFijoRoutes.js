import express from "express";
import { eliminarGastoFijo, modificarGastoFijo, obtenerGastosFijos, obtenerUnGastoFijo, registrarGastoFijo } from "../controllers/GastosFijosController.js";
import checkAuth from "../middleware/authValidacion.js";

const router = express.Router();

router.post("/gastoFijo/", checkAuth, registrarGastoFijo);
router.get('/gastoFijo/', checkAuth, obtenerGastosFijos);
router.get('/gastoFijo/:id', checkAuth, obtenerUnGastoFijo);
router.put('/gastoFijo/:id', checkAuth, modificarGastoFijo)
router.delete('/gastoFijo/:id', checkAuth, eliminarGastoFijo);

export default router;