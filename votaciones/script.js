let aspirantes = [];
let votos = [];
let votantesRegistrados = [];
let votacionActiva = false;
let votacionFinalizada = false;

function registrarAspirante() {
    const nombre = document.getElementById('nombre-aspirante').value;
    const foto = document.getElementById('foto-aspirante').value;
    const propuestas = document.getElementById('propuestas-aspirante').value;

    if (nombre && propuestas) {
        aspirantes.push({ nombre, foto, propuestas, votos: 0 });
        actualizarListaAspirantes();
        document.getElementById('aspirant-form').reset();
        document.getElementById('iniciar-votacion-btn').disabled = false;
    } else {
        alert('Por favor, complete el nombre y las propuestas del aspirante.');
    }
}

function actualizarListaAspirantes() {
    const listaAspirantes = document.getElementById('lista-aspirantes');
    listaAspirantes.innerHTML = '';
    aspirantes.forEach(aspirante => {
        const listItem = document.createElement('li');
        listItem.textContent = aspirante.nombre;
        listaAspirantes.appendChild(listItem);
    });
}

function iniciarVotacion() {
    if (aspirantes.length > 0 && !votacionFinalizada) {
        votacionActiva = true;
        document.getElementById('admin-section').style.display = 'none';
        document.getElementById('votation-section').style.display = 'block';
        document.getElementById('iniciar-votacion-btn').disabled = true;
    } else if (votacionFinalizada) {
        alert('La votación ya ha finalizado.');
    } else {
        alert('Debe registrar al menos un aspirante para iniciar la votación.');
    }
}

function mostrarCandidatos() {
    if (!votacionActiva || votacionFinalizada) {
        alert(votacionFinalizada ? 'La votación ha finalizado.' : 'La votación aún no ha comenzado.');
        return;
    }

    const nombreVotante = document.getElementById('nombre-votante').value;
    const cursoVotante = document.getElementById('curso-votante').value;
    const codigoVotante = document.getElementById('codigo-votante').value;

    if (!nombreVotante || !cursoVotante || !/^\d{6}$/.test(codigoVotante)) {
        alert('Por favor, complete su nombre, curso y un código estudiantil de 6 dígitos válido.');
        return;
    }

    if (votantesRegistrados.includes(codigoVotante)) {
        alert('Este código estudiantil ya ha sido utilizado para votar.');
        document.getElementById('voter-form').reset();
        return;
    }

    document.getElementById('voter-form').style.display = 'none';
    const listaCandidatosDiv = document.getElementById('lista-candidatos');
    listaCandidatosDiv.innerHTML = '';

    aspirantes.forEach((aspirante, index) => {
        const candidatoCard = document.createElement('div');
        candidatoCard.classList.add('candidato-card');

        if (aspirante.foto) {
            const fotoImg = document.createElement('img');
            fotoImg.src = aspirante.foto;
            fotoImg.alt = `Foto de ${aspirante.nombre}`;
            candidatoCard.appendChild(fotoImg);
        }

        const candidatoInfo = document.createElement('div');
        candidatoInfo.classList.add('candidato-info');
        const nombreCandidato = document.createElement('h4');
        nombreCandidato.textContent = aspirante.nombre;
        const propuestasCandidato = document.createElement('p');
        propuestasCandidato.textContent = `Propuestas: ${aspirante.propuestas}`;
        candidatoInfo.appendChild(nombreCandidato);
        candidatoInfo.appendChild(propuestasCandidato);
        candidatoCard.appendChild(candidatoInfo);

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'candidato-seleccionado';
        radioInput.value = index;
        radioInput.classList.add('candidato-select');
        candidatoCard.appendChild(radioInput);

        listaCandidatosDiv.appendChild(candidatoCard);
    });

    document.getElementById('candidates-section').style.display = 'block';
    document.getElementById('votar-btn').disabled = false;
    sessionStorage.setItem('nombreVotante', nombreVotante);
    sessionStorage.setItem('cursoVotante', cursoVotante);
    sessionStorage.setItem('codigoVotante', codigoVotante);
}

function registrarVoto() {
    if (!votacionActiva || votacionFinalizada) {
        alert('La votación ha finalizado. No se pueden registrar más votos.');
        return;
    }

    const candidatoSeleccionado = document.querySelector('input[name="candidato-seleccionado"]:checked');

    if (candidatoSeleccionado) {
        const indiceCandidato = parseInt(candidatoSeleccionado.value);
        aspirantes[indiceCandidato].votos++;
        const codigoVotante = sessionStorage.getItem('codigoVotante');
        votantesRegistrados.push(codigoVotante);
        actualizarResultados();
        document.getElementById('candidates-section').style.display = 'none';
        document.getElementById('voter-form').reset();
        document.getElementById('voter-form').style.display = 'block';
        document.getElementById('mensaje-votacion').textContent = '¡Su voto ha sido registrado!';
        setTimeout(() => {
            document.getElementById('mensaje-votacion').textContent = '';
        }, 3000);
    } else {
        alert('Por favor, seleccione un candidato para votar.');
    }
}

function actualizarResultados() {
    const resultadosLista = document.getElementById('resultados-lista');
    resultadosLista.innerHTML = '';
    const resultadosOrdenados = [...aspirantes].sort((a, b) => b.votos - a.votos);
    resultadosOrdenados.forEach(aspirante => {
        const listItem = document.createElement('li');
        listItem.textContent = `${aspirante.nombre}: ${aspirante.votos} votos`;
        resultadosLista.appendChild(listItem);
    });
}

function finalizarVotacion() {
    if (votacionActiva && !votacionFinalizada) {
        votacionFinalizada = true;
        votacionActiva = false;
        document.getElementById('votation-section').style.display = 'none';
        document.getElementById('finalizar-votacion-btn').disabled = true;
        document.getElementById('votacion-finalizada-mensaje').style.display = 'block';

        const resultadosFinalesLista = document.getElementById('resultados-finales-lista');
        resultadosFinalesLista.innerHTML = '';
        const resultadosOrdenados = [...aspirantes].sort((a, b) => b.votos - a.votos);
        resultadosOrdenados.forEach(aspirante => {
            const listItem = document.createElement('li');
            listItem.textContent = `${aspirante.nombre}: ${aspirante.votos} votos`;
            resultadosFinalesLista.appendChild(listItem);
        });

        alert('La votación ha finalizado. Los resultados finales se muestran en la parte inferior.');
    } else if (!votacionActiva) {
        alert('La votación aún no ha comenzado.');
    } else {
        alert('La votación ya ha sido finalizada.');
    }
}

// Inicializar la actualización de resultados al cargar
actualizarResultados();

