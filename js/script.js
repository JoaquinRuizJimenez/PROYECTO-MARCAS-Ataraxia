//Constantes iniciales

const PORT = 3000;
const coleccion_rutina = "rutina";
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
    const buscarporingredienteAlimentacion = document.getElementById("buscaringredientesAlimentacion")      //Input buscar por ingredientes Alimentacion

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
            const rutina = await respuesta.json();


            mostrarRutina(rutina);

        } catch (error) {
            console.error("Error en la consulta de las rutinas", error);
            mensajesalidaRutina.innerHTML = `<p>Error en la consulta de rutinas: ${error}</p>`
        }

    }


    function mostrarRutina(rutina) {

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
            if (filtro === "nombre") {
                url += `?nombre=${encodeURIComponent(valor)}`
            } else if (filtro === "musculo") {
                let musculosArray = valor.split(",").map(musculo => musculo.trim()); //Separamos los músculos por comas y eliminamos los espacios
                url += `?musculo=${encodeURIComponent(JSON.stringify(musculosArray))}` //Convertimos el array a JSON para que lo entienda el servidor
            }


            const respuesta = await fetch(url);
            const ejercicios = await respuesta.json();


            mostrarEjercicios(ejercicios);

        } catch (error) {
            console.error("Error en la consulta de las ejercicios", error);
            mensajesalidaEjercicios.innerHTML = `<p>Error en la consulta de ejercicios: ${error}</p>`
        }

    }


    function mostrarEjercicios(ejercicios) {

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
                let  = valor.split(",").map(musculo => musculo.trim());         //Separamos los músculos por comas y eliminamos los espacios
                url += `?musculo=${encodeURIComponent(JSON.stringify())}`       //Convertimos el array a JSON para que lo entienda el servidor
            } else if (filtro === "dificultad"){
                url += `?dificultad=${encodeURIComponent(valor)}`
            }


            const respuesta = await fetch(url);
            const alimentos = await respuesta.json();


            mostrarAlimentacion(alimentos);

        } catch (error) {
            console.error("Error en la consulta de los alimentos", error);
            mensajesalidaAlimentacion.innerHTML = `<p>Error en la consulta de los alimentos: ${error}</p>`
        }

    }


    function mostrarAlimentacion(alimentos) {

        if (alimentos.length === 0) {
            console.log("No hay alimentos en la BD");
            return;
        }

        alimentos.forEach(alimentos => {

            let div = document.createElement("div");                //Creamos el div y le damos los datos
            div.classList.add("contenedor-receta-alimentacion");
            div.innerHTML = `<p>Nombre: <span>${alimentos.nombre}</span></p>
                             <p>Ingredientes: <span>${alimentos.ingredientes ? alimentos.ingredientes.join("") : "N/A"}</span></p>
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


    //BOTONES DE RUTINAS
    botonmostrartodosRutinas.addEventListener("click", () => consultarRutinas);
    botonbuscarpornombreRutinas.addEventListener("click", () => consultarRutinas(buscarpornombreRutina.value.trim())); //Llamamos a la función de buscar por nombre y le pasamos el valor del input
    
    //BOTONES DE EJERCICIOS
    botonmostrartodosEjercicios.addEventListener("click", () => consultarEjercicios);
    botonbuscarpornombreEjercicios.addEventListener("click", () => consultarEjercicios(buscarpornombreEjercicios.value.trim())); //Llamamos a la función de buscar por nombre y le pasamos el valor del input
    botonbuscarpormusculoEjercicios.addEventListener("click", () => consultarEjercicios(buscarpormusculoEjercicios.value.trim())); //Llamamos a la función de buscar por nombre y le pasamos el valor del input
    
    //BOTONES DE ALIMENTACION
    botonmostrartodosAlimentacion.addEventListener("click", () => consultarAlimentos());
    botonbuscarporingredientesAlimentacion.addEventListener("click", () => consultarAlimentos(buscarporingredienteAlimentacion.value.trim())); 
    botonbuscarpornombreAlimentacion.addEventListener("click", () => consultarAlimentos(buscarpornombreAlimentacion.value.trim()));
    botonbuscarpordificultadAlimentacion.addEventListener("click", () => consultarAlimentos(buscarpordificultadAlimentacion.value.trim()));




});
