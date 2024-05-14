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
            });
        }
    });
});

function procesarXML(xml) {
    var atracciones = [];
    $(xml).find('Atraccion').each(function() {
        var id = $(this).attr('id');
        var nombre = $(this).find('nombre').text();
        var areaTematica = $(this).closest('AreaTematica').find('nombreAT').text();
        var tipo = $(this).find('tipo').text();
        var intensidad = $(this).find('intensidad').text();
        atracciones.push({
            id: id,
            nombre: nombre,
            areaTematica: areaTematica,
            tipo: tipo,
            intensidad: intensidad,
            tiempoEspera: null // Se llenará después con el JSON
        });
    });
    return atracciones;
}

function combinarDatos(atraccionesXML, atraccionesJSON) {
    for (var i = 0; i < atraccionesXML.length; i++) {
        var id = atraccionesXML[i].id;
        if (atraccionesJSON.atracciones.hasOwnProperty(id)) {
            atraccionesXML[i].tiempoEspera = atraccionesJSON.atracciones[id].tiempo_espera.normal;
        }
    }
    return atraccionesXML;
}

function generarContenido(atracciones) {
    var contenido = '';
    for (var i = 0; i < atracciones.length; i++) {
        contenido += '<div class="card mb-3">';
        contenido += '<div class="card-body">';
        contenido += '<h5 class="card-title">' + atracciones[i].nombre + '</h5>';
        contenido += '<p class="card-text"><strong>Área Temática:</strong> ' + atracciones[i].areaTematica + '</p>';
        contenido += '<p class="card-text"><strong>Tipo:</strong> ' + atracciones[i].tipo + '</p>';
        contenido += '<p class="card-text"><strong>Intensidad:</strong> ' + atracciones[i].intensidad + '</p>';
        contenido += '<p class="card-text"><strong>Tiempo de Espera:</strong> ' + (atracciones[i].tiempoEspera ? atracciones[i].tiempoEspera + ' minutos' : 'No disponible') + '</p>';
        contenido += '</div>';
        contenido += '</div>';
    }
    $('#atracciones-list').html(contenido);
}
