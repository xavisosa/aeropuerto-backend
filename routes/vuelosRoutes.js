import { getAllVuelos, getDestinos, getVueloById, getAllUsuarios, insertarJugador } from "../controllers/vuelosController.js";
import express from "express";
const router = express.Router();

router.get("/login", getAllUsuarios);
router.get("/vuelos", getAllVuelos);
router.get("/destinos", getDestinos);
router.get("/vuelo/:id", getVueloById);
router.post("/insertar", insertarJugador);

export default router;
