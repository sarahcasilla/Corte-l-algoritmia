document.addEventListener('DOMContentLoaded', () => {
    const inputNuevaTarea = document.getElementById('nueva-tarea');
    const botonAgregarTarea = document.getElementById('agregar-tarea');
    const listaTareas = document.getElementById('lista-tareas');

    // Función para agregar una nueva tarea a la lista
    function agregarNuevaTarea() {
        const textoTarea = inputNuevaTarea.value.trim();
        if (textoTarea !== '') {
            const nuevaTarea = document.createElement('li');
            nuevaTarea.innerHTML = `
                <input type="checkbox">
                <span>${textoTarea}</span>
                <button class="eliminar-tarea">Eliminar</button>
            `;
            listaTareas.appendChild(nuevaTarea);
            inputNuevaTarea.value = ''; // Limpiar el input

            const checkbox = nuevaTarea.querySelector('input[type="checkbox"]');
            const botonEliminar = nuevaTarea.querySelector('.eliminar-tarea');
            const spanTarea = nuevaTarea.querySelector('span');

            // Evento para marcar como completada
            checkbox.addEventListener('change', () => {
                nuevaTarea.classList.toggle('completada');
            });

            // Evento para eliminar la tarea
            botonEliminar.addEventListener('click', () => {
                listaTareas.removeChild(nuevaTarea);
            });
        }
    }

    // Evento para agregar tarea al hacer clic en el botón
    botonAgregarTarea.addEventListener('click', agregarNuevaTarea);

    // Evento para agregar tarea al presionar Enter en el input
    inputNuevaTarea.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            agregarNuevaTarea();
        }
    });
});