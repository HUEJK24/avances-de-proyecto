const express = require('express');
const mysqlConnection = require('./db');

const app = express();
const PORT = process.env.PORT || 3043;

// Middleware para parsear JSON en las solicitudes POST
app.use(express.json());

// Ruta para obtener todas las citas
app.get('/api/citas', (req, res) => {
    mysqlConnection.query('SELECT * FROM Citas', (err, results) => {
        if (err) {
            console.error('Error al obtener citas: ', err);
            res.status(500).json({ error: 'Error al obtener citas' });
            return;
        }
        res.json(results);
    });
});

// Ruta para registrar una nueva cita
app.post('/api/registrar-cita', (req, res) => {
    const { nombreCompleto, fecha, estado, asunto, motivo, estadoSolicitud } = req.body;

    const query = `
        INSERT INTO Citas (nombreCompleto, fecha, estado, asunto, motivo, estadoSolicitud)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    mysqlConnection.query(query, [nombreCompleto, fecha, estado, asunto, motivo, estadoSolicitud], (err, result) => {
        if (err) {
            console.error('Error al registrar cita: ', err);
            res.status(500).json({ error: 'Error al registrar cita' });
            return;
        }

        // Devolver la nueva cita registrada como respuesta
        const nuevaCita = {
            id: result.insertId,
            nombreCompleto,
            fecha,
            estado,
            asunto,
            motivo,
            estadoSolicitud
        };
        res.json(nuevaCita);
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});