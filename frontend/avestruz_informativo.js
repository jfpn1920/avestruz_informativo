//----------------------------------------//
//--|funcionalidad_avestruz_informativo|--// 
//----------------------------------------//
const btnFavorito = document.getElementById("btnFavorito");
const textoCuriosidad = document.getElementById("curiosidad");
const textoProgreso = document.getElementById("progreso");
const btnCuriosidad = document.getElementById("btnCuriosidad");
const inputNota = document.getElementById("nota");
const curiosidades = [
    "Su huevo es el más grande de todas las aves: pesa cerca de 1,5 kg.",
    "Puede correr hasta 70 km/h y dar zancadas de hasta 5 metros.",
    "Sus ojos son los más grandes de las aves terrestres: miden unos 5 cm.",
    "Es la única ave que tiene solo dos dedos en cada pie.",
    "No esconde la cabeza bajo la tierra: es un mito. Si hay peligro, huye o se agacha."
];
//--------------------------// 
//--|almacenamiento_local|--//
//--------------------------// 
const CLAVE = "avestruz_estado";
function nuevoEstado() {
    return { indice: 0, vistos: [0], favorito: false, nota: "" };
}
function leerEstado() {
    try {
        const guardado = localStorage.getItem(CLAVE);
        if (guardado) {
            return JSON.parse(guardado);
        }
        return nuevoEstado();
    } catch (error) {
        return nuevoEstado();
    }
}
function guardarEstado() {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
}
let estado = leerEstado();
//---------------------//
//--|acciones_pagina|--//
//---------------------//
function siguienteCuriosidad() {
    estado.indice = (estado.indice + 1) % curiosidades.length;
    if (!estado.vistos.includes(estado.indice)) {
        estado.vistos.push(estado.indice);
    }
    guardarEstado();
    dibujarPantalla();
}
function alternarFavorito() {
    estado.favorito = !estado.favorito;
    guardarEstado();
    dibujarPantalla();
}
//--------------//
//--|pantalla|--//
//--------------//
function dibujarPantalla() {
    textoCuriosidad.textContent = curiosidades[estado.indice];
    textoProgreso.textContent = "Has leído " + estado.vistos.length + " de " + curiosidades.length + " datos curiosos.";
    if (estado.favorito) {
        btnFavorito.textContent = "★ Favorito";
    } else {
        btnFavorito.textContent = "☆ Favorito";
    }
    btnFavorito.classList.toggle("activo", estado.favorito);
}
//-------------//
//--|eventos|--//
//-------------//
btnCuriosidad.addEventListener("click", siguienteCuriosidad);
btnFavorito.addEventListener("click", alternarFavorito);
inputNota.addEventListener("input", () => {
    estado.nota = inputNota.value;
    guardarEstado();
});
//--------------//
//--|arranque|--//
//--------------//
inputNota.value = estado.nota;
dibujarPantalla();