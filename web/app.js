document.addEventListener('DOMContentLoaded', () => {
    const citaForm = document.getElementById('cita-form');
    const citasList = document.getElementById('citas-list');

    // Manejar el evento de envío del formulario
    citaForm.addEventListener('submit', event => {
        event.preventDefault(); // Prevenir el envío por defecto del formulario

        // Obtener los valores del formulario
        const nombreCompleto = document.getElementById('nombreCompleto').value;
        const fecha = document.getElementById('fecha').value;
        const estado = document.getElementById('estado').value;
        const asunto = document.getElementById('asunto').value;
        const motivo = document.getElementById('motivo').value;
        const estadoSolicitud = document.getElementById('estadoSolicitud').value;

        // Crear objeto con los datos de la cita
        const nuevaCita = {
            nombreCompleto,
            fecha,
            estado,
            asunto,
            motivo,
            estadoSolicitud
        };

        // Enviar los datos al servidor para registrar la cita
        fetch('/api/registrar-cita', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaCita)
        })
        .then(response => response.json())
        .then(citaRegistrada => {
            // Limpiar el formulario después de registrar la cita
            citaForm.reset();

            // Agregar la nueva cita a la lista en la interfaz
            const li = document.createElement('li');
            li.textContent = `${citaRegistrada.nombreCompleto} - ${citaRegistrada.fecha} - ${citaRegistrada.asunto}`;
            citasList.appendChild(li);
        })
        .catch(error => console.error('Error al registrar cita:', error));
    });

    // Obtener y mostrar las citas existentes al cargar la página
    fetch('/api/citas')
        .then(response => response.json())
        .then(citas => {
            citas.forEach(cita => {
                const li = document.createElement('li');
                li.textContent = `${cita.nombreCompleto} - ${cita.fecha} - ${cita.asunto}`;
                citasList.appendChild(li);
            });
        })
        .catch(error => console.error('Error al obtener citas:', error));
});