// Conversión de tiempo a decimal (HHMM a decimal)
function convertir_a_decimal(horas, minutos) {
    let decimal = 0;
    if (minutos >= 1 && minutos <= 2) decimal = 0.0;
    else if (minutos >= 3 && minutos <= 8) decimal = 0.1;
    else if (minutos >= 9 && minutos <= 14) decimal = 0.2;
    else if (minutos >= 15 && minutos <= 20) decimal = 0.3;
    else if (minutos >= 21 && minutos <= 26) decimal = 0.4;
    else if (minutos >= 27 && minutos <= 33) decimal = 0.5;
    else if (minutos >= 34 && minutos <= 39) decimal = 0.6;
    else if (minutos >= 40 y minutos <= 45) decimal = 0.7;
    else if (minutos >= 46 y minutos <= 51) decimal = 0.8;
    else if (minutos >= 52 y minutos <= 57) decimal = 0.9;
    else if (minutos >= 58 y minutos <= 60) decimal = 1;

    return horas + decimal;
}

// Conversión basada en HHMM
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

    actualizarHistorial(`HHMM: ${hhmm} => Decimal: ${tiempo_decimal.toFixed(1)}`);
}

// Cálculo del tiempo de vuelo entre dos horarios
function calcularTiempoVuelo() {
    const despegue = document.getElementById('despegue').value;
    const aterrizaje = document.getElementById('aterrizaje').value;

    if (!despegue || !aterrizaje) {
        alert('Por favor ingresa ambos horarios.');
        return;
    }

    const despegueDate = new Date(`1970-01-01T${despegue}:00`);
    const aterrizajeDate = new Date(`1970-01-01T${aterrizaje}:00`);

    let diferenciaMs = aterrizajeDate - despegueDate;
    if (diferenciaMs < 0) {
        // Si el aterrizaje es después de medianoche, se corrige sumando 24 horas
        diferenciaMs += 24 * 60 * 60 * 1000;
    }

    const diferenciaMin = Math.floor(diferenciaMs / (1000 * 60));
    const horas = Math.floor(diferenciaMin / 60);
    const minutos = diferenciaMin % 60;

    const tiempo_decimal = convertir_a_decimal(horas, minutos);
    document.getElementById('resultado').innerText = `Tiempo de vuelo en decimal: ${tiempo_decimal.toFixed(1)}`;

    actualizarHistorial(`Despegue: ${despegue} - Aterrizaje: ${aterrizaje} => Decimal: ${tiempo_decimal.toFixed(1)}`);
}

// Guardar y mostrar historial
function actualizarHistorial(item) {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.unshift(item);  // Agrega el nuevo elemento al inicio
    if (historial.length > 3) {
        historial.pop();  // Limita a 3 entradas
    }
    localStorage.setItem('historial', JSON.stringify(historial));
    mostrarHistorial();
}

function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    const ul = document.getElementById('historial');
    ul.innerHTML = '';
    historial.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
}

// Listeners
document.getElementById('convertirBtn').onclick = convertirTiempo;
document.getElementById('calcularTiempoBtn').onclick = calcularTiempoVuelo;
document.getElementById('toggleThemeBtn').onclick = function() {
    document.body.classList.toggle('dark-theme');
}

// Cargar historial al inicio
window.onload = mostrarHistorial;
