$(document).ready(function() {
    // Cargar y procesar datos del XML
    $.ajax({
        type: "GET",
        url: "xml/datos.xml",
        dataType: "xml",
        success: function(xml) {
            // Procesar datos del XML
            var atraccionesXML = procesarXML(xml);
            
            // Cargar y procesar datos del JSON
            $.getJSON("json/datos.json", function(json) {
                // Combinar datos del XML y JSON
                var atracciones = combinarDatos(atraccionesXML, json);
                
                // Generar y renderizar contenido dinámico
                generarContenido(atracciones);
                
                // Restaurar favoritos del localStorage
                restaurarFavoritos();
            });
        }
    });

    // Evento para mostrar solo favoritos
    $('#mostrar-favoritos').click(function() {
        mostrarFavoritos();
    });
});

function procesarXML(xml) {
    var atracciones = [];
    $(xml).find('AreaTematica').each(function() {
        var areaTematica = $(this).find('nombreAT').text();
        $(this).find('Atraccion').each(function() {
            var id = $(this).attr('id');
            var nombre = $(this).find('nombre').text();
            var tipo = $(this).find('tipo').text();
            var intensidad = $(this).find('intensidad').text();
            atracciones.push({
                id: id,
                nombre: nombre,
                areaTematica: areaTematica,
                tipo: tipo,
                intensidad: intensidad,
                tiempoEspera: null, // Se llenará después con el JSON
                tiempoEsperaExpress: null // Se llenará después con el JSON
            });
        });
    });
    return atracciones;
}

function combinarDatos(atraccionesXML, atraccionesJSON) {
    for (var i = 0; i < atraccionesXML.length; i++) {
        var id = atraccionesXML[i].id;
        if (atraccionesJSON.atracciones.hasOwnProperty(id)) {
            atraccionesXML[i].tiempoEspera = atraccionesJSON.atracciones[id].tiempo_espera.normal;
            atraccionesXML[i].tiempoEsperaExpress = atraccionesJSON.atracciones[id].tiempo_espera.express;
        }
    }
    return atraccionesXML;
}

function generarContenido(atracciones) {
    var contenido = '';
    var areas = {};

    // Agrupar atracciones por área temática
    for (var i = 0; i < atracciones.length; i++) {
        var area = atracciones[i].areaTematica;
        if (!areas[area]) {
            areas[area] = [];
        }
        areas[area].push(atracciones[i]);
    }

    // Generar contenido agrupado por áreas temáticas
    for (var area in areas) {
        if (areas.hasOwnProperty(area)) {
            contenido += '<h2 class="mt-5">' + area + '</h2>';
            for (var j = 0; j < areas[area].length; j++) {
                var atraccion = areas[area][j];
                contenido += '<div class="card mb-3" data-id="' + atraccion.id + '">';
                contenido += '<div class="card-body">';
                contenido += '<h5 class="card-title">' + atraccion.nombre + '</h5>';
                contenido += '<p class="card-text"><strong>Tipo:</strong> ' + atraccion.tipo + '</p>';
                contenido += '<p class="card-text"><strong>Intensidad:</strong> ' + atraccion.intensidad + '</p>';
                contenido += '<p class="card-text"><strong>Tiempo de Espera:</strong> ' + (atraccion.tiempoEspera ? atraccion.tiempoEspera + ' minutos' : 'No disponible') + '</p>';
                contenido += '<p class="card-text"><strong>Tiempo de Espera con Pase Express:</strong> ' + (atraccion.tiempoEsperaExpress ? atraccion.tiempoEsperaExpress + ' minutos' : 'No disponible') + '</p>';
                contenido += '<img src="imagenes/logo/estrella_vacia.png" class="favorito-icon marcar-favorito" alt="Marcar como Favorito" />';
                contenido += '</div>';
                contenido += '</div>';
            }
        }
    }

    $('#atracciones-list').html(contenido);

    // Asignar eventos a los iconos de favorito
    $('.marcar-favorito').click(function() {
        var card = $(this).closest('.card');
        var id = card.data('id');
        toggleFavorito(id, card);
    });
}

function toggleFavorito(id, card) {
    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    var index = favoritos.indexOf(id);

    if (index === -1) {
        favoritos.push(id);
        card.addClass('favorito');
        card.find('.marcar-favorito').attr('src', 'imagenes/logo/estrella_llena.png');
    } else {
        favoritos.splice(index, 1);
        card.removeClass('favorito');
        card.find('.marcar-favorito').attr('src', 'imagenes/logo/estrella_vacia.png');
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function restaurarFavoritos() {
    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    for (var i = 0; i < favoritos.length; i++) {
        var card = $('.card[data-id="' + favoritos[i] + '"]');
        card.addClass('favorito');
        card.find('.marcar-favorito').attr('src', 'imagenes/logo/estrella_llena.png');
    }
}

function mostrarFavoritos() {
    $('.card').hide();
    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    for (var i = 0; i < favoritos.length; i++) {
        $('.card[data-id="' + favoritos[i] + '"]').show();
    }
}