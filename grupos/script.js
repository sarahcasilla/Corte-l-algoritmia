document.addEventListener('DOMContentLoaded', () => {
    const fileUpload = document.getElementById('file-upload');
    const fileNameDisplay = document.getElementById('file-name');
    const studentListBody = document.getElementById('student-list');
    const generateGroupsButton = document.getElementById('generate-groups-button');
    const groupsContainer = document.getElementById('groups-container');
    let students = [];

    fileUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            fileNameDisplay.textContent = `Archivo seleccionado: ${file.name}`;
            readFile(file);
        } else {
            fileNameDisplay.textContent = '';
            students = [];
            renderStudentList();
            generateGroupsButton.disabled = true;
        }
    });

    generateGroupsButton.addEventListener('click', () => {
        generateAndDisplayGroups(students);
    });

    function readFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const contents = e.target.result;
            parseFileContents(contents, file.name);
        };
        reader.onerror = () => {
            alert('Error al leer el archivo.');
        };
        reader.readAsText(file);
    }

    function parseFileContents(contents, fileName) {
        students = [];
        const lines = contents.trim().split('\n');
        lines.forEach(line => {
            const parts = line.split(';');
            if (parts.length >= 4) {
                const nombreCompletoApellido = parts[1].trim();
                const genero = parts[3].trim();

                const palabras = nombreCompletoApellido.split(' ');
                let nombreCompleto;
                if (palabras.length > 1) {
                    const nombre = palabras[palabras.length - 1];
                    const apellidos = palabras.slice(0, palabras.length - 1).join(' ');
                    nombreCompleto = `${nombre} ${apellidos}`;
                } else {
                    nombreCompleto = nombreCompletoApellido;
                    console.warn(`Nombre con una sola palabra: ${nombreCompleto}`);
                }

                const generoLower = genero.toLowerCase();

                if (generoLower === 'f' || generoLower === 'femenino') {
                    students.push({ genero: 'femenino', nombreCompleto });
                } else if (generoLower === 'm' || generoLower === 'masculino') {
                    students.push({ genero: 'masculino', nombreCompleto });
                } else {
                    alert(`Formato de género inválido: ${genero} en la línea: ${line}`);
                }
            } else if (line.trim() !== "") {
                alert(`Formato de línea incorrecto: ${line}`);
            }
        });
        sortStudentsAlphabetically();
        renderStudentList();
        generateGroupsButton.disabled = students.length === 0;
    }

    function sortStudentsAlphabetically() {
        students.sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto));
    }

    function renderStudentList() {
        studentListBody.innerHTML = '';
        students.forEach(student => {
            const row = studentListBody.insertRow();
            const nameCell = row.insertCell();
            const genderCell = row.insertCell();
            nameCell.textContent = student.nombreCompleto;
            genderCell.textContent = student.genero.charAt(0).toUpperCase() + student.genero.slice(1);
        });
    }

    function generateAndDisplayGroups(studentList) {
        const mujeres = studentList.filter(student => student.genero === 'femenino');
        const hombres = studentList.filter(student => student.genero === 'masculino');
        const grupos = [];

        mujeres.sort(() => Math.random() - 0.5);
        hombres.sort(() => Math.random() - 0.5);

        let mujerIndex = 0;
        while (mujerIndex < mujeres.length) {
            const grupo = [mujeres[mujerIndex]];
            mujerIndex++;
            let hombresAgregados = 0;
            while (hombresAgregados < 2 && hombres.length > 0) {
                grupo.push(hombres.shift());
                hombresAgregados++;
            }
            grupos.push(grupo);
        }

        while (hombres.length >= 1) {
            const grupoSoloHombres = [];
            for (let i = 0; i < 3 && hombres.length > 0; i++) {
                grupoSoloHombres.push(hombres.shift());
            }
            if (grupoSoloHombres.length > 0) {
                grupos.push(grupoSoloHombres);
            }
        }

        displayGroups(grupos);
    }

    function displayGroups(groups) {
        groupsContainer.innerHTML = '';
        groups.forEach((group, index) => {
            const groupDiv = document.createElement('div');
            groupDiv.classList.add('group');
            groupDiv.innerHTML = `<h3>Grupo ${index + 1}</h3>`;
            group.forEach(student => {
                groupDiv.innerHTML += `<p>${student.nombreCompleto} (${student.genero.charAt(0).toUpperCase() + student.genero.slice(1)})</p>`;
            });
            groupsContainer.appendChild(groupDiv);
        });
    }
});
