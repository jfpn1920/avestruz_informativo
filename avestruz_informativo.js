// ===== REFERENCIAS A LOS ELEMENTOS DEL HTML =====
const btnFavorito = document.getElementById('btnFavorito');
const textoCuriosidad = document.getElementById('curiosidad');
const textoProgreso = document.getElementById('progreso');
const btnCuriosidad = document.getElementById('btnCuriosidad');
const inputNota = document.getElementById('nota');
// ===== LISTA DE DATOS CURIOSOS =====
const curiosidades = [
    'Su huevo es el más grande de todas las aves: pesa cerca de 1,5 kg.',
    'Puede correr hasta 70 km/h y dar zancadas de hasta 5 metros.',
    'Sus ojos son los más grandes de las aves terrestres: miden unos 5 cm.',
    'Es la única ave que tiene solo dos dedos en cada pie.',
    'No esconde la cabeza bajo la tierra: es un mito. Si hay peligro, huye o se agacha.'
];
// ===== CLAVE DE LOCALSTORAGE =====
const CLAVE = 'avestruz_estado';
// ===== ESTADO POR DEFECTO =====
// indice: dato curioso que se muestra | vistos: datos ya leídos
// favorito: true o false | nota: texto escrito por el usuario
const estadoInicial = { indice: 0, vistos: [0], favorito: false, nota: '' };
// ===== LEER EL ESTADO GUARDADO =====
function leerEstado() {
    try {
        const guardado = localStorage.getItem(CLAVE);
        // Si hay datos guardados los usamos; si no, partimos del estado inicial
        return guardado
            ? { ...estadoInicial, ...JSON.parse(guardado) }
            : { ...estadoInicial, vistos: [0] };
    } catch (error) {
      return { ...estadoInicial, vistos: [0] }; // si algo falla, empezamos desde cero
    }
}
// Al cargar la página recuperamos todo lo guardado
let estado = leerEstado();
// ===== GUARDAR EL ESTADO =====
function guardarEstado() {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
}
// ===== MOSTRAR EL SIGUIENTE DATO CURIOSO =====
function siguienteCuriosidad() {
    // El operador % hace que al llegar al último vuelva al primero
    estado.indice = (estado.indice + 1) % curiosidades.length;
    // Si es la primera vez que se ve este dato, lo anotamos como leído
    if (!estado.vistos.includes(estado.indice)) estado.vistos.push(estado.indice);
    guardarEstado();
    dibujarPantalla();
}
// ===== MARCAR O QUITAR EL FAVORITO =====
function alternarFavorito() {
    estado.favorito = !estado.favorito;  // invierte el valor (true pasa a false y viceversa)
    guardarEstado();
    dibujarPantalla();
}
// ===== ACTUALIZAR TODO LO QUE SE VE EN PANTALLA =====
function dibujarPantalla() {
    // Dato curioso actual y cuántos has leído
    textoCuriosidad.textContent = curiosidades[estado.indice];
    textoProgreso.textContent =
        `Has leído ${estado.vistos.length} de ${curiosidades.length} datos curiosos.`;
    // Botón de favorito: cambia el texto y el color según el estado
    btnFavorito.textContent = estado.favorito ? '★ Favorito' : '☆ Favorito';
    btnFavorito.classList.toggle('activo', estado.favorito);
}
// ===== EVENTOS =====
btnCuriosidad.addEventListener('click', siguienteCuriosidad);
btnFavorito.addEventListener('click', alternarFavorito);
// La nota se guarda mientras se escribe
inputNota.addEventListener('input', () => {
    estado.nota = inputNota.value;
    guardarEstado();
});
// ===== INICIO: se ejecuta al cargar o refrescar la página =====
inputNota.value = estado.nota;  // recupera la nota escrita
dibujarPantalla();              // recupera el dato curioso, el progreso y el favorito