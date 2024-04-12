import { Storage } from "./Storage.js";

class Alumno {
    constructor(nombre, matricula, fechaNacimiento, carrera) {
        this.nombre = nombre;
        this.matricula = matricula;
        this.fechaNacimiento = fechaNacimiento;
        this.carrera = carrera;
    }
}

var alumno = Storage.obtener('alumnos') || [];

const formA = document.getElementById('form');
const tabla = document.getElementById('datos');

formA.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const matricula = document.getElementById('matricula').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const carrera = document.getElementById('carrera').value;
    
    const nuevoAlumno = new Alumno(nombre, matricula, fechaNacimiento, carrera);
    alumno.push(nuevoAlumno);
    Storage.asignar('alumnos', alumno);
    mostrarAlumno();
    formA.reset();
});

function mostrarAlumno() {
    tabla.innerHTML = '';
    alumno.forEach((alum, index) => {
        const fila = `
            <tr>
                <td>${index + 1}</td>
                <td>${alum.nombre}</td>
                <td>${alum.matricula}</td>
                <td>${alum.fechaNacimiento}</td>
                <td>${alum.carrera}</td>
                <td>
                    <button class="btn btn-warning btnEditar" data-indice="${index}">Editar</button>
                    <button class="btn btn-danger btnEliminar" data-indice="${index}">Eliminar</button>
                </td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

tabla.addEventListener('click', function(event) {
    if (event.target.classList.contains('btnEliminar')) {
        const indice = event.target.getAttribute('data-indice');
        alumno.splice(indice, 1);
        Storage.asignar('alumnos', alumno);
        mostrarAlumno();
    } else if (event.target.classList.contains('btnEditar')) {
        const indice = event.target.getAttribute('data-indice');
        const alu = alumno[indice];
        document.getElementById('nombre').value = alu.nombre;
        document.getElementById('matricula').value = alu.matricula;
        document.getElementById('fechaNacimiento').value = alu.fechaNacimiento;
        document.getElementById('carrera').value = alu.carrera;
        
        const guardarBtn = document.createElement('button');
        guardarBtn.textContent = 'Guardar';
        guardarBtn.classList.add('btn', 'btn-success', 'btnGuardar');
        guardarBtn.setAttribute('data-indice', indice);
        
        const form = document.getElementById('form');
        form.appendChild(guardarBtn);
        
        guardarBtn.addEventListener('click', function(event) {
            const indice = event.target.getAttribute('data-indice');
            const nombre = document.getElementById('nombre').value;
            const matricula = document.getElementById('matricula').value;
            const fechaNacimiento = document.getElementById('fechaNacimiento').value;
            const carrera = document.getElementById('carrera').value;
            
            alumno[indice].nombre = nombre;
            alumno[indice].matricula = matricula;
            alumno[indice].fechaNacimiento = fechaNacimiento;
            alumno[indice].carrera = carrera;
            
            Storage.asignar('alumnos', alumno);
            mostrarAlumno();
            
            form.reset();
            form.removeChild(guardarBtn);
        });
    }
});