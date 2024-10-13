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

    if (hhmm.length !== 4 || isNaN(hhmm)) {
        alert('Por favor ingresa un tiempo válido en formato HHMM.');
        return;
    }

    const horas = Math.floor(hhmm / 100);
    const minutos = hhmm % 100;

    if (horas < 0 || horas > 23 || minutos < 0 || minutos > 59) {
        alert('Por favor ingresa un tiempo válido en formato HHMM.');
        return;
    }

    const tiempo_decimal = convertir_a_decimal(horas, minutos);
    document.getElementById('resultado').innerText = `Tiempo de vuelo en decimal: ${tiempo_decimal.toFixed(1)}`;

    // Guardar en el historial
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push(`HHMM: ${hhmm} => Decimal: ${tiempo_decimal.toFixed(1)}`);
    
    // Limitar el historial a un máximo de 3 entradas
    if (historial.length > 3) {
        historial.shift(); // Elimina la entrada más antigua
    }
    
    localStorage.setItem('historial', JSON.stringify(historial));
    mostrarHistorial();
}

function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    const ul = document.getElementById('historial');
    ul.innerHTML = '';
    
    // Mostrar solo hasta 3 entradas
    const maxEntries = Math.min(historial.length, 3); // Se asegura de que no se muestren más de 3
    for (let i = 0; i < maxEntries; i++) {
        const li = document.createElement('li');
        li.textContent = historial[i];
        ul.appendChild(li);
    }
}

document.getElementById('convertirBtn').onclick = convertirTiempo;
document.getElementById('toggleThemeBtn').onclick = function() {
    document.body.classList.toggle('dark-theme');
}

// Cargar historial al cargar la página
window.onload = mostrarHistorial;
