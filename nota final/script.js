function calcularNotaNecesaria() {
    // Limpiar errores anteriores
    document.getElementById('error1').textContent = '';
    document.getElementById('error2').textContent = '';
    document.getElementById('errorDeseada').textContent = '';
    
    // Obtener valores
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const notaDeseada = parseFloat(document.getElementById('notaDeseada').value);
    
    // Validar entradas
    let hayError = false;
    
    if (isNaN(nota1) || nota1 < 1.0 || nota1 > 5.0) {
        document.getElementById('error1').textContent = 'Ingresa una nota válida (entre 1.0 y 5.0)';
        hayError = true;
    }
    
    if (isNaN(nota2) || nota2 < 1.0 || nota2 > 5.0) {
        document.getElementById('error2').textContent = 'Ingresa una nota válida (entre 1.0 y 5.0)';
        hayError = true;
    }
    
    if (isNaN(notaDeseada) || notaDeseada < 1.0 || notaDeseada > 5.0) {
        document.getElementById('errorDeseada').textContent = 'Ingresa una nota válida (entre 1.0 y 5.0)';
        hayError = true;
    }
    
    if (hayError) {
        document.getElementById('resultado').style.display = 'none';
        return;
    }
    
    // Calcular nota necesaria
    const contribucionActual = (nota1 * 0.3) + (nota2 * 0.3);
    const contribucionNecesaria = notaDeseada - contribucionActual;
    const notaFinalNecesaria = contribucionNecesaria / 0.4;
    
    // Mostrar resultado
    document.getElementById('notaObjetivo').textContent = notaDeseada.toFixed(1);
    
    let mensajeNota = '';
    if (notaFinalNecesaria <= 1.0) {
        mensajeNota = '1.0 (ya has alcanzado el objetivo)';
    } else if (notaFinalNecesaria > 5.0) {
        mensajeNota = 'Es imposible alcanzar esta nota con las calificaciones actuales';
    } else {
        mensajeNota = notaFinalNecesaria.toFixed(1);
    }
    
    document.getElementById('notaNecesaria').textContent = mensajeNota;
    document.getElementById('resultado').style.display = 'block';
}