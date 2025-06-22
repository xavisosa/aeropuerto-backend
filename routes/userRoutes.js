import express from "express";
import { login, createUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/login/:email/:password", login);
router.post("/users", createUser);
router.put("/users/:id", updateUser);

export default router;
