import express from "express";
import mysql from "mysql2";
import cors from "cors";
import vuelosRoutes from "./routes/vuelosRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 7400;

app.use(cors());
app.use(express.json());

app.use("/", vuelosRoutes);
app.use("/", userRoutes);

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "aeropuerto"
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// CREATE 
app.post("/user", (req, res) => {
    const { nombre, email, password } = req.body
    if (!nombre || !email || !password) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const sql = "INSERT INTO usuario (nombre, email, password) VALUES (?, ?, ?)";
    db.query(sql, [nombre, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        
        res.status(201).json({ id: result.insertId })
    });
});

// READ
app.get("/users", (req, res) => {
    const sql = "SELECT * FROM usuario";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        res.status(200).json(results);
    });
});

// UPDATE
app.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const sql = "UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?";
    db.query(sql, [nombre, email, password, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario actualizado correctamente" });
    });
});

// DELETE
app.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM usuarios WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario eliminado correctamente" });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Algo salió mal" });
});

// Close the database connection when the app is terminated
process.on("SIGINT", () => {
    db.end(err => {
        if (err) {
            console.error("Error closing the database connection:", err);
        } else {
            console.log("Database connection closed.");
        }
        process.exit(0);
    });
});

// Export the app for testing purposes
export default app;

