import express from "express";
import { autenticarUsuario, confirmarUsuario } from "../controllers/AuthController.js";

const router = express.Router();

router.get("/auth/:token", confirmarUsuario);
router.post("/auth/", autenticarUsuario);

export default router;

