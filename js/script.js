const PORT = 3000;
const coleccion_rutina = "rutinas";
const coleccion_ejercicios = "ejercicios";
const coleccion_alimentos = "alimentos";

document.addEventListener("DOMContentLoaded", () => {

    // Mensajes de salida
    const mensajesalidaRutina = document.getElementById("mensajesalidaRutina");
    const mensajesalidaEjercicios = document.getElementById("mensajesalidaEjercicios");
    const mensajesalidaAlimentacion = document.getElementById("mensajesalidaAlimentacion");

    // Inputs
    const buscarpornombreRutina = document.getElementById("buscarpornombreRutinas");
    const buscarpornombreEjercicios = document.getElementById("buscarpornombreEjercicios");
    const buscarpormusculoEjercicios = document.getElementById("buscarpormusculoEjercicios");
    const buscarpornombreAlimentacion = document.getElementById("buscarpornombreAlimentacion");
    const buscarporingredientesAlimentacion = document.getElementById("buscarporingredientesAlimentacion");
    const buscarpordificultadAlimentacion = document.getElementById("buscardificultadAlimentacion");

    // Botones
    const botonmostrartodosRutinas = document.getElementById("botonmostrartodosRutinas");
    const botonbuscarpornombreRutinas = document.getElementById("botonbuscarpornombreRutinas");
    const botonmostrartodosAlimentacion = document.getElementById("botonmostrartodosAlimentacion");
    const botonbuscarpornombreAlimentacion = document.getElementById("botonbuscarpornombreAlimentacion");
    const botonbuscarporingredientesAlimentacion = document.getElementById("botonbuscarporingredientesAlimentacion");
    const botonbuscarpordificultadAlimentacion = document.getElementById("botonbuscarpordificultadAlimentacion");
    const botonmostrartodosEjercicios = document.getElementById("botonmostrartodosEjercicios");
    const botonbuscarpornombreEjercicios = document.getElementById("botonbuscarpornombreEjercicios");
    const botonbuscarpormusculoEjercicios = document.getElementById("botonbuscarpormusculoEjercicios");

    // RUTINAS
    async function consultarRutinas(filtro = "todos", valor = "") {
        try {
            let url = `http://localhost:${PORT}/${coleccion_rutina}`;
            if (filtro === "nombre") {
                url += `?nombre=${encodeURIComponent(valor)}`;
            }
            const respuesta = await fetch(url);
            if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
            const rutina = await respuesta.json();
            mostrarRutina(rutina);
        } catch (error) {
            mensajesalidaRutina.innerHTML = `<p>Error en la consulta de rutinas: ${error}</p>`;
        }
    }

    function mostrarRutina(rutinas) {
        mensajesalidaRutina.innerHTML = "";
        if (rutinas.length === 0) return;
        rutinas.forEach(rutina => {
            const div = document.createElement("div");
            div.classList.add("contenedor-ejercicio-rutinas");
            div.innerHTML = `
                <p>Nombre: <span>${rutina.nombre}</span></p>
                <p>Dias/Semana: <span>${rutina.diasSemana}</span> días</p>
                <p>Duracion: <span>${rutina.duracion}</span> minutos</p>
                <p>Descripción: <span>${rutina.descripcion}</span></p>`;
            mensajesalidaRutina.appendChild(div);
        });
    }

    // EJERCICIOS
    async function consultarEjercicios(filtro = "todos", valor = "") {
        try {
            let url = `http://localhost:${PORT}/${coleccion_ejercicios}`;
            if (filtro === "Nombre") {
                url += `?nombre=${encodeURIComponent(valor)}`;
            } else if (filtro === "GrupoMuscular") {
                const musculosArray = valor.split(",").map(m => m.trim());
                url += musculosArray.map(musculo => `?GrupoMuscular=${encodeURIComponent(musculo)}`).join("&");
            }
            console.log(url);
            const respuesta = await fetch(url);
            if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
            const ejercicios = await respuesta.json();
            mostrarEjercicios(ejercicios);
        } catch (error) {
            mensajesalidaEjercicios.innerHTML = `<p>Error en la consulta de ejercicios: ${error}</p>`;
        }
    }

    function mostrarEjercicios(ejercicios) {
        mensajesalidaEjercicios.innerHTML = "";
        if (ejercicios.length === 0) return;
        ejercicios.forEach(ejercicio => {
            const div = document.createElement("div");
            div.classList.add("contenedor-ejercicio-ejercicios");
            div.innerHTML = `
                <p>Nombre: <span>${ejercicio.Nombre}</span></p>
                <p>Musculos: <span>${ejercicio.GrupoMuscular}</span></p>
                <p>Duracion: <span>${ejercicio.Series}</span></p>
                <p>Descripción: <span>${ejercicio.Repeticiones}</span></p>
                <p>Descanso: <span>${ejercicio.Descanso}</span> minutos</p>`;
            mensajesalidaEjercicios.appendChild(div);
        });
    }

    // ALIMENTACIÓN
    async function consultarAlimentos(filtro = "todos", valor = "") {
        try {
            let url = `http://localhost:${PORT}/${coleccion_alimentos}`;
            if (filtro === "nombre") {
                url += `?nombre=${encodeURIComponent(valor)}`;
            } else if (filtro === "ingredientes") {
                const ingredientesArray = valor.split(",").map(m => m.trim());
                url += ingredientesArray.map(i => `?ingredientes=${encodeURIComponent(i)}`).join("&");
            } else if (filtro === "dificultad") {
                url += `?dificultad=${encodeURIComponent(valor)}`;
            }
            const respuesta = await fetch(url);
            if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
            const alimentos = await respuesta.json();
            mostrarAlimentacion(alimentos);
        } catch (error) {
            mensajesalidaAlimentacion.innerHTML = `<p>Error en la consulta de los alimentos: ${error}</p>`;
        }
    }

    function mostrarAlimentacion(alimentos) {
        mensajesalidaAlimentacion.innerHTML = "";
        if (alimentos.length === 0) return;
        alimentos.forEach(alimento => {
            const div = document.createElement("div");
            div.classList.add("contenedor-receta-alimentacion");
            div.innerHTML = `
                <p>Nombre: <span>${alimento.nombre}</span></p>
                <p>Ingredientes: <span>${alimento.ingredientes}</span></p>
                <p>Calorias: <span>${alimento.calorias}</span></p>
                <p>Proteinas: <span>${alimento.proteinas}</span>g.</p>
                <p>Carbohidratos: <span>${alimento.carbohidratos}</span>g.</p>
                <p>Grasas: <span>${alimento.grasas}</span>g.</p>
                <p>Dificultad: <span>${alimento.dificultad}</span></p>
                <p>Tiempo: <span>${alimento.tiempo}</span> minutos.</p>`;
            mensajesalidaAlimentacion.appendChild(div);
        });
    }

    // EVENTOS

    // Rutinas
    if (botonmostrartodosRutinas) {
        botonmostrartodosRutinas.addEventListener("click", () => consultarRutinas());
    }
    if (botonbuscarpornombreRutinas && buscarpornombreRutina) {
        botonbuscarpornombreRutinas.addEventListener("click", () => {
            consultarRutinas("nombre", buscarpornombreRutina.value.trim());
        });
    }

    // Ejercicios
    if (botonmostrartodosEjercicios) {
        botonmostrartodosEjercicios.addEventListener("click", () => consultarEjercicios());
    }
    if (botonbuscarpornombreEjercicios && buscarpornombreEjercicios) {
        botonbuscarpornombreEjercicios.addEventListener("click", () => {
            consultarEjercicios("Nombre", buscarpornombreEjercicios.value.trim());
        });
    }
    if (botonbuscarpormusculoEjercicios && buscarpormusculoEjercicios) {
        botonbuscarpormusculoEjercicios.addEventListener("click", () => {
            consultarEjercicios("GrupoMuscular", buscarpormusculoEjercicios.value.trim());
        });
    }

    // Alimentación
    if (botonmostrartodosAlimentacion) {
        botonmostrartodosAlimentacion.addEventListener("click", () => consultarAlimentos());
    }
    if (botonbuscarporingredientesAlimentacion && buscarporingredientesAlimentacion) {
        botonbuscarporingredientesAlimentacion.addEventListener("click", () => {
            consultarAlimentos("ingredientes", buscarporingredientesAlimentacion.value.trim());
        });
    }
    if (botonbuscarpornombreAlimentacion && buscarpornombreAlimentacion) {
        botonbuscarpornombreAlimentacion.addEventListener("click", () => {
            consultarAlimentos("nombre", buscarpornombreAlimentacion.value.trim());
        });
    }
    if (botonbuscarpordificultadAlimentacion && buscarpordificultadAlimentacion) {
        botonbuscarpordificultadAlimentacion.addEventListener("click", () => {
            consultarAlimentos("dificultad", buscarpordificultadAlimentacion.value.trim());
        });
    }

});
