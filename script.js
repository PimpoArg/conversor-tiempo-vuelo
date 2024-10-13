let historial = [];

function convertir_a_decimal(horas, minutos) {
    let decimal = 0;

    if (minutos >= 1 && minutos <= 2) decimal = 0.0;
    else if (minutos >= 3 && minutos <= 8) decimal = 0.1;
    else if (minutos >= 9 && minutos <= 14) decimal = 0.2;
    else if (minutos >= 15 && minutos <= 20) decimal = 0.3;
    else if (minutos >= 21 && minutos <= 26) decimal = 0.4;
    else if (minutos >= 27 && minutos <= 33) decimal = 0.5;
    else if (minutos >= 34 && minutos <= 39) decimal = 0.6;
    else if (minutos >= 40 && minutos <= 45) decimal = 0.7;
    else if (minutos >= 46 && minutos <= 51) decimal = 0.8;
    else if (minutos >= 52 && minutos <= 57) decimal = 0.9;
    else if (minutos >= 58 && minutos <= 60) decimal = 1;

    return horas + decimal;
}

function convertirTiempo() {
    const hhmm = document.getElementById('hhmm').value;
    const horas = Math.floor(hhmm / 100);
    const minutos = hhmm % 100;

    const tiempo_decimal = convertir_a_decimal(horas, minutos);
    document.getElementById('resultado').innerText = `Tiempo de vuelo en decimal: ${tiempo_decimal.toFixed(1)}`;

    // Añadir al historial
    añadirAlHistorial(tiempo_decimal);
}

function añadirAlHistorial(tiempo_decimal) {
    // Añadir el nuevo tiempo al historial
    historial.push(tiempo_decimal);
    
    // Limitar el historial a 3 entradas
    if (historial.length > 3) {
        historial.shift(); // Eliminar el primer elemento
    }

    // Mostrar historial en la página
    mostrarHistorial();
}

function mostrarHistorial() {
    const historialElemento = document.getElementById('historial');
    historialElemento.innerHTML = ''; // Limpiar el historial actual

    historial.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item'; // Clase de Bootstrap para lista
        li.textContent = `Conversión ${index + 1}: ${item.toFixed(1)} horas`;
        historialElemento.appendChild(li);
    });
}
