//Constantes iniciales

const PORT = 3000;
const coleccion_rutina = "rutinas";
const coleccion_ejercicios = "ejercicios";
const coleccion_alimentos = "alimentos";

//Esperamos a que el DOM esté completamente cargado para ejecutar el código
document.addEventListener("DOMContentLoaded", () => {

    //Mensajes de salida
    const mensajesalidaRutina = document.getElementById("mensajesalidaRutina");
    const mensajesalidaEjercicios = document.getElementById("mensajesalidaEjercicios");
    const mensajesalidaAlimentacion = document.getElementById("mensajesalidaAlimentacion");

    // Constantes de las búsquedas por cada cosa
    const buscarpornombreRutina = document.getElementById("buscarpornombreRutinas");                        //Input buscar por nombre en Rutinas  
    const buscarpornombreEjercicios = document.getElementById("buscarpornombreEjercicios");                 //Input buscar por nombre en Ejercicios
    const buscarpormusculoEjercicios = document.getElementById("buscarpormusculoEjercicios");               //Input buscar por músculo en Ejercicios
    const buscarpornombreAlimentacion = document.getElementById("buscarpornombreAlimentacion");             //Input buscar por nombre en Alimentacion
    const buscarporingredientesAlimentacion = document.getElementById("buscarporingredientesAlimentacion")      //Input buscar por ingredientes Alimentacion
    const buscarpordificultadAlimentacion = document.getElementById("buscardificultadAlimentacion")          //Input buscar por dificultad Alimentacion

    //Botones para la búsqueda
    const botonmostrartodosRutinas = document.getElementById("botonmostrartodosRutinas");                     //Boton mostrar todos en Rutinas
    const botonbuscarpornombreRutinas = document.getElementById("botonbuscarpornombreRutinas");         //Boton buscar por nombre en Rutinas
    const botonmostrartodosAlimentacion = document.getElementById("botonmostrartodosAlimentacion");             //Boton mostrar todos en Alimentacion
    const botonbuscarpornombreAlimentacion = document.getElementById("botonbuscarpornombreAlimentacion");   //Boton buscar por nombre en Alimentacion
    const botonbuscarporingredientesAlimentacion = document.getElementById("botonbuscarporingredientesAlimentacion");   //Boton buscar por ingredientes en Alimentacion
    const botonbuscarpordificultadAlimentacion = document.getElementById("botonbuscarpordificultadAlimentacion");   //Boton buscar por dificultad en Alimentacion
    const botonmostrartodosEjercicios = document.getElementById("botonmostrartodosEjercicios");                 //Boton mostrar todos en Ejercicios
    const botonbuscarpornombreEjercicios = document.getElementById("botonbuscarpornombreEjercicios");           //Boton buscar por nombre en Ejercicios
    const botonbuscarpormusculoEjercicios = document.getElementById("botonbuscarpormusculoEjercicios");         //Boton buscar por musculo en Ejercicios


    /*
    *
    *   FUNCIONALIDAD DE LOS BOTONES DE RUTINA
    *
    */


    async function consultarRutinas(filtro = "todos", valor = "") {             //Esta función obtiene los datos del JSON en funcion de 
        //si se ha incluido un filtro o no
        try {

            let url = `http://localhost:${PORT}/${coleccion_rutina}`

            //Si el filtro tiene un valor nombre, buscará por nombre
            if (filtro === "nombre") {
                url += `?nombre=${encodeURIComponent(valor)}`
            }


            const respuesta = await fetch(url);
            if (!respuesta.ok) {
                throw new Error(`Error en la respuesta: ${respuesta.status}`);
            }
            const rutina = await respuesta.json();
            console.log('Rutina:', rutina);

            mostrarRutina(rutina);

        } catch (error) {
            console.error("Error en la consulta de las rutinas", error);
            mensajesalidaRutina.innerHTML = `<p>Error en la consulta de rutinas: ${error}</p>`
        }

    }


    function mostrarRutina(rutina) {

        mensajesalidaRutina.innerHTML = ""; // Limpiamos el contenedor de mensajes

        if (rutina.length === 0) {
            console.log("No hay rutinas en la BD");
            return;
        }

        rutina.forEach(rutina => {

            let div = document.createElement("div");                //Creamos el div y le damos los datos
            div.classList.add("contenedor-ejercicio-rutinas");
            div.innerHTML = `<p>Nombre: <span>${rutina.nombre}</span></p>
                             <p>Dias/Semana: <span>${rutina.diasSemana}</span> días</p>
                             <p>Duracion: <span>${rutina.duracion}</span> minutos</p>
                             <p>Descripción: <span>${rutina.descripcion}</span></p>`
            mensajesalidaRutina.appendChild(div);                   //Introducimos el div
        })



    }



    /*
    *
    *   FUNCIONALIDAD DE LOS BOTONES DE EJERCICIOS
    *
    */

    async function consultarEjercicios(filtro = "todos", valor = "") {                 //Esta función obtiene los datos del JSON en funcion de 
        //si se ha incluido un filtro o no
        try {

            let url = `http://localhost:${PORT}/${coleccion_ejercicios}`

            //Si el filtro tiene un valor nombre, buscará por nombre
            if (filtro === "Nombre") {
                url += `?Nombre=${encodeURIComponent(valor)}`
            } else if (filtro === "GrupoMuscular") {
                let musculosArray = valor.split(",").map(musculo => musculo.trim()); //Separamos los músculos por comas y eliminamos los espacios
                url += `?GrupoMuscular=${encodeURIComponent(JSON.stringify(musculosArray))}` //Convertimos el array a JSON para que lo entienda el servidor
            }


            const respuesta = await fetch(url);
            if (!respuesta.ok) {
                throw new Error(`Error en la respuesta: ${respuesta.status}`);
            }
            const ejercicios = await respuesta.json();


            mostrarEjercicios(ejercicios);

        } catch (error) {
            console.error("Error en la consulta de las ejercicios", error);
            mensajesalidaEjercicios.innerHTML = `<p>Error en la consulta de ejercicios: ${error}</p>`
        }

    }


    function mostrarEjercicios(ejercicios) {

        mensajesalidaEjercicios.innerHTML = ""; // Limpiamos el contenedor de mensajes

        if (ejercicios.length === 0) {
            console.log("No hay ejercicios en la BD");
            return;
        }

        ejercicios.forEach(ejercicios => {

            let div = document.createElement("div");                //Creamos el div y le damos los datos
            div.classList.add("contenedor-ejercicio-ejercicios");
            div.innerHTML = `<p>Nombre: <span>${ejercicios.Nombre}</span></p>
                             <p>Dias/Semana: <span>${ejercicios.GrupoMuscular}</span></p>
                             <p>Duracion: <span>${ejercicios.Series}</span></p>
                             <p>Descripción: <span>${ejercicios.Repeticiones}</span></p>
                             <p>Descanso: <span>${ejercicios.Descanso}</span> minutos</p>`
            mensajesalidaEjercicios.appendChild(div);

        })

    }



    /*
    *
    *   FUNCIONALIDAD DE LOS BOTONES DE ALIMENTACION
    *
    */

    async function consultarAlimentos(filtro = "todos", valor = "") {                 //Esta función obtiene los datos del JSON en funcion de 
                                                                                        //si se ha incluido un filtro o no
        try {

            let url = `http://localhost:${PORT}/${coleccion_alimentos}`

            
            if (filtro === "nombre") {
                url += `?nombre=${encodeURIComponent(valor)}`
            } else if (filtro === "ingredientes") {
                valor = valor.toLowerCase().trim()
                let ingredientesArray =  valor.split(",").map(ingredientes => ingredientes.trim());         //Separamos los músculos por comas y eliminamos los espacios
                url += `?ingredientes=${encodeURIComponent(ingredientesArray.join(","))}`;       //Convertimos el array a JSON para que lo entienda el servidor
            } else if (filtro === "dificultad"){
                url += `?dificultad=${encodeURIComponent(valor)}`
            }


            const respuesta = await fetch(url);
            if (!respuesta.ok) {
                throw new Error(`Error en la respuesta: ${respuesta.status}`);
            }
            const alimentos = await respuesta.json();


            mostrarAlimentacion(alimentos);

        } catch (error) {
            console.error("Error en la consulta de los alimentos", error);
            mensajesalidaAlimentacion.innerHTML = `<p>Error en la consulta de los alimentos: ${error}</p>`
        }

    }


    function mostrarAlimentacion(alimentos) {

        mensajesalidaAlimentacion.innerHTML = ""; // Limpiamos el contenedor de mensajes

        if (alimentos.length === 0) {
            console.log("No hay alimentos en la BD");
            return;
        }

        alimentos.forEach(alimentos => {

            let div = document.createElement("div");                //Creamos el div y le damos los datos
            div.classList.add("contenedor-receta-alimentacion");
            div.innerHTML = `<p>Nombre: <span>${alimentos.nombre}</span></p>
                             <p>Ingredientes: <span>${alimentos.ingredientes}</span></p>
                             <p>Calorias: <span>${alimentos.calorias}</span></p>
                             <p>Proteinas: <span>${alimentos.proteinas}</span>g.</p>
                             <p>Carbohidratos: <span>${alimentos.carbohidratos}</span>g.</p>
                             <p>Grasas: <span>${alimentos.grasas}</span>g.</p>
                             <p>Dificultad: <span>${alimentos.dificultad}</span> </p>
                             <p>Tiempo: <span>${alimentos.tiempo}</span> minutos.</p>`

            mensajesalidaAlimentacion.appendChild(div);
        })

    }


    /*
    *
    *   FUNCIONALIDAD DE LOS BOTONES DE BUSQUEDA
    *
    * * Son necesarios los '.addEventListener' para que se se puedan aplicar los filtros correctamente
    */ 


   // BOTONES DE RUTINAS
if (botonmostrartodosRutinas) {
    botonmostrartodosRutinas.addEventListener("click", () => consultarRutinas());
}
if (botonbuscarpornombreRutinas) {
    botonbuscarpornombreRutinas.addEventListener("click", () => consultarRutinas("nombre", buscarpornombreRutina.value));
}

// BOTONES DE EJERCICIOS
if (botonmostrartodosEjercicios) {
    botonmostrartodosEjercicios.addEventListener("click", () => consultarEjercicios());
}
if (botonbuscarpornombreEjercicios) {
    botonbuscarpornombreEjercicios.addEventListener("click", () => consultarEjercicios("nombre", buscarpornombreEjercicios.value));
}
if (botonbuscarpormusculoEjercicios) {
    botonbuscarpormusculoEjercicios.addEventListener("click", () => consultarEjercicios("musculo", buscarpormusculoEjercicios.value));
}

// BOTONES DE ALIMENTACIÓN
if (botonmostrartodosAlimentacion) {
    botonmostrartodosAlimentacion.addEventListener("click", () => consultarAlimentos());
}
if (botonbuscarporingredientesAlimentacion) {
    botonbuscarporingredientesAlimentacion.addEventListener("click", () => consultarAlimentos("ingredientes", buscarporingredientesAlimentacion.value));
}
if (botonbuscarpornombreAlimentacion) {
    botonbuscarpornombreAlimentacion.addEventListener("click", () => consultarAlimentos("nombre", buscarpornombreAlimentacion.value));
}
if (botonbuscarpordificultadAlimentacion) {
    botonbuscarpordificultadAlimentacion.addEventListener("click", () => consultarAlimentos("dificultad", buscarpordificultadAlimentacion.value));
}



});
