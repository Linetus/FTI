// Función para cargar los datos de la API
async function cargarDatos() {
    fetch('https://samuelencinas.dev/shows_parque/P19')
        .then(response => response.json())
        .then(data => {
            mostrarDatos(data);
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

// Función para mostrar los datos en la página
function mostrarDatos(data) {
    const fecha = data.date;
    const shows = data.shows;
    const container1 = document.getElementById('shows1');
    const container2 = document.getElementById('shows2');
    const container3 = document.getElementById('shows3');
    const container4 = document.getElementById('shows4');
    const container5 = document.getElementById('shows5');

    container1.innerHTML += `Plaza Mayor`;
    for (let n = 0; n < shows[0].PLA.length; n++) {
        if (shows[0].PLA[n].express == true) {
            container1.innerHTML += `<br><br>Espectáculo: ${JSON.stringify(shows[0].PLA[n].name, null, 2)} "espress"<br>`;
        } else {
            container1.innerHTML += `<br><br>Espectáculo: ${JSON.stringify(shows[0].PLA[n].name, null, 2)}<br>`;
        }
        container1.innerHTML += `<ul style="margin-left: 25px;">`;
        for (let i = 0; i < shows[0].PLA[n].hours.length; i++) {
            container1.innerHTML += `<li>Hora: ${JSON.stringify(shows[0].PLA[n].hours[i], null, 2)}</li>`;
        }
        container1.innerHTML += `</ul>`;
    }

    container2.innerHTML += `The Far West`;
    for (let n = 0; n < shows[0].TFW.length; n++) {
        if (shows[0].TFW[n].express == true) {
            container2.innerHTML += `<br><br>Espectáculo: ${JSON.stringify(shows[0].TFW[n].name, null, 2)} "espress"<br>`;
        } else {
            container2.innerHTML += `<br><br>Espectáculo: ${JSON.stringify(shows[0].TFW[n].name, null, 2)}<br>`;
        }
        container2.innerHTML += `<ul style="margin-left: 25px;">`;
        for (let i = 0; i < shows[0].TFW[n].hours.length; i++) {
            container2.innerHTML += `<li>Hora: ${JSON.stringify(shows[0].TFW[n].hours[i], null, 2)}</li>`;
        }
        container2.innerHTML += `</ul>`;
    }

    container3.innerHTML += `Territorio Pirata`;
    for (let n = 0; n < shows[0].PIR.length; n++) {
        if (shows[0].PIR[n].express == true) {
            container3.innerHTML += `<br><br>Espectáculo: ${JSON.stringify(shows[0].PIR[n].name, null, 2)} "espress"<br>`;
        } else {
            container3.innerHTML += `<br><br>Espectáculo: ${JSON.stringify(shows[0].PIR[n].name, null, 2)}<br>`;
        }
        container3.innerHTML += `<ul style="margin-left: 25px;">`;
        for (let i = 0; i < shows[0].PIR[n].hours.length; i++) {
            container3.innerHTML += `<li>Hora: ${JSON.stringify(shows[0].PIR[n].hours[i], null, 2)}</li>`;
        }
        container3.innerHTML += `</ul>`;
    }

    container4.innerHTML += `Cool Children Land`;
    for (let n = 0; n < shows[0].CCL.length; n++) {
        if (shows[0].CCL[n].express == true) {
            container4.innerHTML += `<br><br>Espectáculo: ${JSON.stringify(shows[0].CCL[n].name, null, 2)} "espress"<br>`;
        } else {
            container4.innerHTML += `<br><br>Espectáculo: ${JSON.stringify(shows[0].CCL[n].name, null, 2)}<br>`;
        }
        container4.innerHTML += `<ul style="margin-left: 25px;">`;
        for (let i = 0; i < shows[0].CCL[n].hours.length; i++) {
            container4.innerHTML += `<li>Hora: ${JSON.stringify(shows[0].CCL[n].hours[i], null, 2)}</li>`;
        }
        container4.innerHTML += `</ul>`;
    }

    container5.innerHTML += `Calle Futura`;
    for (let n = 0; n < shows[0].FUT.length; n++) {
        if (shows[0].FUT[n].express == true) {
            container5.innerHTML += `<br><br>Espectáculo: ${JSON.stringify(shows[0].FUT[n].name, null, 2)} "espress"<br>`;
        } else {
            container5.innerHTML += `<br><br>Espectáculo: ${JSON.stringify(shows[0].FUT[n].name, null, 2)}<br>`;
        }
        container5.innerHTML += `<ul style="margin-left: 25px;">`;
        for (let i = 0; i < shows[0].FUT[n].hours.length; i++) {
            container5.innerHTML += `<li>Hora: ${JSON.stringify(shows[0].FUT[n].hours[i], null, 2)}</li>`;
        }
        container5.innerHTML += `</ul>`;
    }
}

// Función para inicializar el mapa
function initMap() {
    // Coordenadas de la dirección que quieres mostrar en el mapa
    var myLatLng = { lat: 40.416775, lng: -3.703790 }; // Madrid, España

    // Opciones del mapa
    var mapOptions = {
        zoom: 15, // Nivel de zoom
        center: myLatLng // Centro del mapa
    };

    // Crear el mapa dentro del contenedor con id "map"
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Marcador en la ubicación especificada
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'FTILand - Calle de la Fantasía, 123, Madrid, España'
    });
}

// Ejecutar la función principal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarDatos);