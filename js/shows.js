$(document).ready(function() {
    // Hacer solicitud GET a la API de espectáculos
    $.ajax({
        type: "GET",
        url: "https://samuelencinas.dev/shows_parque/P16", // Reemplaza "P16" con tu número de grupo
        dataType: "json",
        success: function(response) {
            mostrarEspectaculos(response);
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener los espectáculos:", error);
        }
    });
});

function mostrarEspectaculos(data) {
    var currentDate = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato ISO

    // Filtrar los espectáculos del día actual
    var showsToday = data.shows[currentDate];
    if (!showsToday || showsToday.length === 0) {
        $('#espectaculos-list').html('<p>No hay espectáculos programados para hoy.</p>');
        return;
    }

    // Generar HTML para mostrar los espectáculos
    var contenido = '<div class="list-group">';
    showsToday.forEach(function(show) {
        contenido += '<a href="#" class="list-group-item list-group-item-action">';
        contenido += '<h5 class="mb-1">' + show.name + '</h5>';
        contenido += '<p class="mb-1">Horarios: ' + show.hours.join(', ') + '</p>';
        if (show.express) {
            contenido += '<small>Con pase express disponible</small>';
        }
        contenido += '</a>';
    });
    contenido += '</div>';

    // Mostrar los espectáculos en el contenedor
    $('#espectaculos-list').html(contenido);
}