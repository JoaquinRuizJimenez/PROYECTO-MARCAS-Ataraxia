//Constantes iniciales

const PORT = 3000;
const coleccion_rutina = "rutina";
const coleccion_ejercicios = "ejercicios";
const coleccion_alimentos = "alimentos";

//Esperamos a que el DOM esté completamente cargado para ejecutar el código
document.addEventListener("DOMContentLoaded", () =>{

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
    const botonmostrartodosEjercicios = document.getElementById("botonmostrartodosEjercicios");                 //Boton mostrar todos en Ejercicios
    const botonbuscarpornombreEjercicios = document.getElementById("botonbuscarpornombreEjercicios");           //Boton buscar por nombre en Ejercicios
    const botonbuscarpormusculoEjercicios = document.getElementById("botonbuscarpormusculoEjercicios");         //Boton buscar por musculo en Ejercicios


    /*
    *
    *   FUNCIONALIDAD DE LOS BOTONES DE RUTINA
    *
    */ 

    function mostrarTodosRutina(rutina) {
        
        if (rutina.length === 0) {
            console.log("No hay rutinas en la BD");
            return;
        }

        rutina.forEach(rutina =>{

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

    function mostrarTodosEjercicios(ejercicios){

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


    function mostrarTodosAlimentacion(alimentos){

        if (alimentos.length === 0) {
            console.log("No hay alimentos en la BD");
            return;
        }

        alimentos.forEach(alimentos => {
            
            let div = document.createElement("div");                //Creamos el div y le damos los datos
            div.classList.add("contenedor-receta-alimentacion");
            div.innerHTML = `<p>Nombre: <span>${ejercicios.Nombre}</span></p>
                             <p>Ingredientes: <span>${ejercicios.GrupoMuscular}</span></p>
                             <p>Calorias: <span>${ejercicios.Series}</span></p>
                             <p>Proteinas: <span>${ejercicios.Repeticiones}</span>g.</p>
                             <p>Carbohidratos: <span>${ejercicios.Descanso}</span>g.</p>
                             <p>Grasas: <span>${ejercicios.Descanso}</span>g.</p>
                             <p>Dificultad: <span>${ejercicios.Descanso}</span> </p>
                             <p>Carbohidratos: <span>${ejercicios.Descanso}</span> minutos.</p>`
            
            mensajesalidaAlimentacion.appendChild(div);
        })

    }
    

    botonmostrartodosRutinas.addEventListener("click", () => mostrarTodosRutina);
    botonmostrartodosEjercicios.addEventListener("click", () => mostrarTodosEjercicios);
    botonmostrartodosAlimentacion.addEventListener("click", () => mostrarTodosAlimentacion);
    



});
