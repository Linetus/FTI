document.addEventListener('DOMContentLoaded', cargarEspectaculos);

async function cargarEspectaculos() {
    try {
        const response = await fetch('https://samuelencinas.dev/shows_parque/P19');
        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        mostrarEspectaculos(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function mostrarEspectaculos(data) {
    const currentDate = new Date().toISOString().split('T')[0];
    const showsToday = data.shows[currentDate];

    const espectaculosList = document.getElementById('espectaculos-list');
    if (!showsToday || showsToday.length === 0) {
        espectaculosList.innerHTML = '<p>No hay espectáculos programados para hoy.</p>';
        return;
    }

    let contenido = '<div class="list-group">';
    showsToday.forEach(show => {
        contenido += '<a href="#" class="list-group-item list-group-item-action">';
        contenido += `<h5 class="mb-1">${show.name}</h5>`;
        contenido += `<p class="mb-1">Horarios: ${show.hours.join(', ')}</p>`;
        if (show.express) {
            contenido += '<small>Con pase express disponible</small>';
        }
        contenido += '</a>';
    });
    contenido += '</div>';

    espectaculosList.innerHTML = contenido;
}
