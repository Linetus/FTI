document.addEventListener('DOMContentLoaded', cargarEspectaculos);

async function cargarEspectaculos() {
    try {
        const response = await fetch('https://samuelencinas.dev/shows_parque/P16');
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
    showsToday.forEach(area => {
        for (const key in area) {
            if (Object.hasOwnProperty.call(area, key)) {
                const espectaculos = area[key];
                if (espectaculos.length > 0) {
                    contenido += `<h5>${key}</h5>`;
                    espectaculos.forEach(show => {
                        contenido += '<a href="#" class="list-group-item list-group-item-action">';
                        contenido += `<h6 class="mb-1">${show.name}</h6>`;
                        contenido += `<p class="mb-1">Horarios: ${show.hours.join(', ')}</p>`;
                        if (show.express) {
                            contenido += '<small>Con pase express disponible</small>';
                        }
                        contenido += '</a>';
                    });
                }
            }
        }
    });
    contenido += '</div>';

    espectaculosList.innerHTML = contenido;
}
