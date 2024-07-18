const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar CORS
app.use(cors());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'citas',
    port: 3308 // Asegúrate de usar el puerto correcto para tu instalación de MySQL
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Rutas
app.get('/', (req, res) => {
    res.send('API de Citas');
});

// Ruta para obtener todas las citas
app.get('/cargar-citas', (req, res) => {
    const sql = `
        SELECT c.*, u.email AS usuario_email, p.nombre AS profesional_nombre 
        FROM citas c
        JOIN usuarios u ON c.usuario_id = u.id
        JOIN profesionales p ON c.profesional_id = p.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error cargando las citas:', err);
            res.status(500).send('Error cargando las citas');
            return;
        }
        res.json(results);
    });
});

// Ruta para guardar una nueva cita
app.post('/guardar-cita', (req, res) => {
    const { profesional_id, fecha, estado, asunto, motivo, estado_solicitud } = req.body;
    const sql = `
        INSERT INTO citas (profesional_id, fecha, estado, asunto, motivo, estado_solicitud) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [profesional_id, fecha, estado, asunto, motivo, estado_solicitud];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error guardando la cita:', err);
            res.status(500).send('Error guardando la cita');
            return;
        }
        res.send('Cita guardada con éxito');
    });
});

// Ruta para actualizar una cita existente
app.put('/actualizar-cita/:id', (req, res) => {
    const { id } = req.params;
    const { profesional_id, fecha, estado, asunto, motivo, estado_solicitud } = req.body;
    const sql = `
        UPDATE citas 
        SET profesional_id = ?, fecha = ?, estado = ?, asunto = ?, motivo = ?, estado_solicitud = ? 
        WHERE id = ?
    `;
    const values = [profesional_id, fecha, estado, asunto, motivo, estado_solicitud, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error actualizando la cita:', err);
            res.status(500).send('Error actualizando la cita');
            return;
        }
        res.send('Cita actualizada con éxito');
    });
});

// Ruta para eliminar una cita existente
app.delete('/eliminar-cita/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM citas WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error eliminando la cita:', err);
            res.status(500).send('Error eliminando la cita');
            return;
        }
        res.send('Cita eliminada con éxito');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
