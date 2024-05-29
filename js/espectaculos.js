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
    const shows = data.shows;
    const espectaculosList = document.getElementById('espectaculos-list');
    
    if (!shows || shows.length === 0) {
        espectaculosList.innerHTML = '<p>No hay espectáculos programados para hoy.</p>';
        return;
    }

    let contenido = '<div class="list-group">';
    const areas = {
        PLA: 'Plaza Central',
        TFW: 'The Far West',
        PIR: 'Pirate Island',
        CCL: 'Candy Land',
        FUT: 'Future World'
    };

    shows.forEach(area => {
        for (const areaName in area) {
            if (Object.hasOwnProperty.call(area, areaName)) {
                const espectaculos = area[areaName];
                const nombreCompleto = areas[areaName] || areaName;

                contenido += `<h5>${nombreCompleto}</h5>`;
                
                espectaculos.forEach(show => {
                    contenido += '<a href="#" class="list-group-item list-group-item-action">';
                    contenido += `<h6 class="mb-1">${show.name}</h6>`;
                    contenido += `<p class="mb-1">Horarios: ${show.hours.join(', ') || 'No hay horarios disponibles'}</p>`;
                    
                    if (show.express) {
                        contenido += '<small>Con pase express disponible</small>';
                    }
                    contenido += '</a>';
                });
            }
        }
    });
    contenido += '</div>';
    espectaculosList.innerHTML = contenido;

    const enlaces = document.querySelectorAll('#espectaculos-list a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
        });
    });
}
