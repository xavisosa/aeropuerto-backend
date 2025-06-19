import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aeropuerto'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');

});

app.get('/login', (req, res) => {
    connection.query('SELECT * FROM Usuario', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Results:', results);
        res.json(results);
    })
});

app.get('/vuelos', (req, res) => {
    connection.query('SELECT * FROM vuelos', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Results:', results);
        res.json(results);
    })
});

app.post('/insertar', (req, res) => {
    const newData = req.body;
    
    if (!newData.createdAt || newData.createdAt === '') {
        newData.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        newData.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    connection.query('INSERT INTO jugadores SET ?', newData, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
        }
        console.log('Inserted data:', results);
        res.json({ message: 'Data inserted successfully', id: results.insertId });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/destinos', (req, res) => {
    connection.query('SELECT destino FROM vuelos', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Results:', results);
        res.json(results);
    })
});


app.get('/vuelo/:id', (req, res) => {
    const vueloId = req.params.id; // Obtener el parámetro de ruta
    connection.query('SELECT * FROM vuelos WHERE idVuelo = ?', [vueloId], (err, results) => {
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
});