// Función para abrir el menú lateral
function openMenu() {
    document.getElementById("side-menu").style.width = "250px";
}

// Función para cerrar el menú lateral
function closeMenu() {
    document.getElementById("side-menu").style.width = "0";
}

// Función para abrir el modal de edición o añadir cita
function openModal(action, index) {
    const modal = document.getElementById("myModal");
    const modalTitle = document.getElementById("modalTitle");
    const editForm = document.getElementById("editForm");

    if (action === 'add') {
        modalTitle.textContent = "Añadir Nueva Cita";
        editForm.reset();
        editForm.onsubmit = function(event) {
            event.preventDefault();
            saveAppointment();
        };
    } else if (action === 'edit') {
        modalTitle.textContent = "Editar Cita";
        fillFormWithAppointment(index);
        editForm.onsubmit = function(event) {
            event.preventDefault();
            saveAppointment(index);
        };
    }

    modal.style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Función para llenar el formulario con los datos de una cita existente
function fillFormWithAppointment(index) {
    const appointment = appointments[index];
    document.getElementById("appointmentIndex").value = index;
    document.getElementById("nombres").value = appointment.nombres;
    document.getElementById("apellidos").value = appointment.apellidos;
    document.getElementById("fecha").value = appointment.fecha;
    document.getElementById("estado").value = appointment.estado;
    document.getElementById("asunto").value = appointment.asunto;
    document.getElementById("motivo").value = appointment.motivo;
    document.getElementById("estado_solicitud").value = appointment.estado_solicitud;
}

// Función para guardar cambios en una cita (añadir o editar)
function saveAppointment(index) {
    const editForm = document.getElementById("editForm");
    const formData = new FormData(editForm);

    const appointment = {
        nombres: formData.get('nombres'),
        apellidos: formData.get('apellidos'),
        fecha: formData.get('fecha'),
        estado: formData.get('estado'),
        asunto: formData.get('asunto'),
        motivo: formData.get('motivo'),
        estado_solicitud: formData.get('estado_solicitud')
    };

    if (index === undefined) {
        // Añadir nueva cita
        appointments.push(appointment);
    } else {
        // Editar cita existente
        appointments[index] = appointment;
    }

    closeModal();
    displayAppointments();
}

// Función para buscar citas por nombre de cliente
function searchAppointment() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const filteredAppointments = appointments.filter(appointment =>
        appointment.nombres.toLowerCase().includes(searchValue) ||
        appointment.apellidos.toLowerCase().includes(searchValue)
    );
    displayAppointments(filteredAppointments);
}

// Función para mostrar las citas en la página
function displayAppointments(appointmentsToDisplay = appointments) {
    const appointmentsContainer = document.getElementById("appointments");
    appointmentsContainer.innerHTML = '';

    appointmentsToDisplay.forEach((appointment, index) => {
        const card = document.createElement('div');
        card.classList.add('appointment-card');
        card.innerHTML = `
            <h3>${appointment.nombres} ${appointment.apellidos}</h3>
            <p><strong>Fecha:</strong> ${appointment.fecha}</p>
            <p><strong>Estado:</strong> ${appointment.estado}</p>
            <p><strong>Asunto:</strong> ${appointment.asunto}</p>
            <p><strong>Motivo:</strong> ${appointment.motivo}</p>
            <p><strong>Estado de la Solicitud:</strong> ${appointment.estado_solicitud}</p>
            <button onclick="openModal('edit', ${index})">Editar</button>
        `;
        appointmentsContainer.appendChild(card);
    });
}

// Inicialización con datos de ejemplo
let appointments = [
    {
        nombres: "Juan",
        apellidos: "Pérez",
        fecha: "2024-07-16",
        estado: "Confirmada",
        asunto: "Sesión de terapia",
        motivo: "Estrés laboral",
        estado_solicitud: "Aprobada"
    },
    {
        nombres: "María",
        apellidos: "Gómez",
        fecha: "2024-07-18",
        estado: "Pendiente",
        asunto: "Consulta psicológica",
        motivo: "Ansiedad",
        estado_solicitud: "En espera"
    }
];

// Mostrar citas al cargar la página
displayAppointments();

// Abre el menú lateral
function openMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.add('open');
}

// Cierra el menú lateral
function closeMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.remove('open');
}

// Alterna la visibilidad del menú desplegable
function toggleDropdown(event) {
    event.preventDefault();
    const dropdownMenu = event.target.nextElementSibling;
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Función para animar el botón al pasar el cursor
const createAppointmentBtn = document.querySelector('.create-appointment button');

createAppointmentBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
    this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
});

createAppointmentBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = 'none';
});

// Event listeners para los botones de abrir y cerrar menú
document.addEventListener('DOMContentLoaded', (event) => {
    const openBtn = document.querySelector('.open-btn');
    const closeBtn = document.querySelector('.close-btn');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    openBtn.addEventListener('click', () => {
        openMenu();
    });

    closeBtn.addEventListener('click', () => {
        closeMenu();
    });

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleDropdown);
    });
});