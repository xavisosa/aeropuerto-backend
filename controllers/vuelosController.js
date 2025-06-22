import db from "../models/db.js";

export const getAllUsuarios = (req, res) => {
    db.query('SELECT * FROM Usuario', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error en el servidor' });
            return;
        }
        res.json(results);
    });
};

export const getAllVuelos = (req, res) => {
    db.query('SELECT * FROM vuelos', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error en el servidor' });
            return;
        }
        res.json(results);
    });
};

export const getDestinos = (req, res) => {
    db.query('SELECT destino FROM vuelos', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error en el servidor' });
            return;
        }
        res.json(results);
    });
};

export const getVueloById = (req, res) => {
    const vueloId = req.params.id;
    db.query('SELECT * FROM vuelos WHERE idVuelo = ?', [vueloId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Vuelo no encontrado');
            return;
        }
        res.json(results);
    });
};

export const insertarJugador = (req, res) => {
    const newData = req.body;
    if (!newData.createdAt || newData.createdAt === '') {
        newData.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        newData.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    db.query('INSERT INTO jugadores SET ?', newData, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
        }
        res.json({ message: 'Data inserted successfully', id: results.insertId });
    });
};
