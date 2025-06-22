import db from "../models/db.js";

export const login = (req, res) => {
    const { email, password } = req.params;
    db.query('SELECT nombre FROM Usuario WHERE email = ? AND contrasena = ?', [email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error en el servidor' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ error: 'Credenciales incorrectas' });
            return;
        }
        res.json(results[0]);
    });
}

export const createUser = (req, res) => {
    const newUser = req.body;
    db.query('INSERT INTO Usuario SET ?', newUser, (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).json({ error: 'Error al crear usuario' });
            return;
        }
        res.json({ message: 'Usuario creado', id: results.insertId });
    });
};

export const updateUser = (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
    db.query('UPDATE Usuario SET ? WHERE idUsuario = ?', [updateData, userId], (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Error al actualizar usuario' });
            return;
        }
        res.json({ message: 'Usuario actualizado' });
    });
};
