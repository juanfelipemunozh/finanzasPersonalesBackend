import express from "express"
import { eliminarConcepto, modificarConcepto, obtenerConceptos, obtenerUnConcepto, registrarConcepto } from "../controllers/ConceptoController.js";
import checkAuth from "../middleware/authValidacion.js";

const router = express.Router();

router.post("/concepto/nuevoConcepto", checkAuth,  registrarConcepto);
router.get("/concepto/", checkAuth, obtenerConceptos);
router.get("/concepto/:id", checkAuth, obtenerUnConcepto);
router.put("/concepto/:id", checkAuth, modificarConcepto);
router.delete("/concepto/:id", checkAuth, eliminarConcepto);

export default router;