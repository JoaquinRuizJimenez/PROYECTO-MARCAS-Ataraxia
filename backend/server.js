const express = require('express');
const {MongoClient} = require('mongodb');
const cors = require('cors');

const app = express();

const PORT = 3000;

const MONGO_URI = 'mongodb://localhost:27017';          // URL de conexión a MongoDB
const Ataraxia = 'BD_Ataraxia';
const coleccion_rutinas = 'rutinas';                    // Nombre de la colección de rutinas
const coleccion_ejercicios = 'ejercicios';              // Nombre de la colección de ejercicios
const coleccion_alimentos = 'alimentos';                // Nombre de la colección de alimentos


app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones como JSON


async function conectarBD(){

    const cliente = new MongoClient(MONGO_URI);
    await cliente.connect();
    console.log('Conectado a MongoDB');
    return {
        rutinas: cliente.db(Ataraxia).collection(coleccion_rutinas),
        ejercicios: cliente.db(Ataraxia).collection(coleccion_ejercicios),
        alimentos: cliente.db(Ataraxia).collection(coleccion_alimentos)
    };

}

/*

    ENDPOINT PARA OBTENER LOS DATOS DE RUTINAS TRAS LA HTTP REQUEST

*/
app.get("/rutinas", async (req, res) => {

    try{
        const collection = await conectarBD();
        let filtro = {};
        let diasSemana;


        if (req.query.nombre) {
            filtro.nombre = {$regex: req.query.nombre, $options: 'i' }; // Búsqueda por nombre indiferente a mayúsculas y minúsculas
        } else if (req.query.diasSemana){
            diasSemana = parseInt(req.query.diasSemana, 10);
        } if (!isNaN(diasSemana)) {
            filtro.diasSemana = diasSemana; // Búsqueda por días de la semana
        }

        const rutinas = await collection.rutinas.find(filtro).toArray(); // Buscamos las rutinas en la colección

        res.json(rutinas); // Devolvemos las rutinas como respuesta en formato JSON

    } catch (error) {
        console.error("Error consultando rutinas:", error);
        res.status(500).json({ error: "Error consultando rutinas" });
    }

});


/*

    ENDPOINT PARA OBTENER LOS DATOS DE EJERCICIOS TRAS LA HTTP REQUEST

*/ 

app.get("/ejercicios", async (req, res) => {
    try{
        const collection = await conectarBD();
        let filtro = {};

        if (req.query.nombre) {
            filtro.nombre = {$regex: req.query.nombre, $options: 'i' }; // Búsqueda por nombre indiferente a mayúsculas y minúsculas
        } else if (req.query.GrupoMuscular){
            const grupoMuscularArray = req.query.GrupoMuscular.split(",").map(m => m.trim());
            filtro.grupoMuscular = {$in: grupoMuscularArray}; // Búsqueda por grupo muscular
        }

        const ejercicios = await collection.ejercicios.find(filtro).toArray(); // Buscamos los ejercicios en la colección

        res.json(ejercicios); // Devolvemos los ejercicios como respuesta en formato JSON

    } catch (error) {
        console.error("Error consultando ejercicios:", error);
        res.status(500).json({ error: "Error consultando ejercicios" });
    }
});


/*

    ENDPOINT PARA OBTENER LOS DATOS DE ALIMENTOS TRAS LA HTTP REQUEST

*/

app.get("/alimentos", async (req, res) => {
    try{
        const collection = await conectarBD();
        let filtro = {};

        if (req.query.nombre) {
            filtro.nombre = {$regex: req.query.nombre, $options: 'i' }; // Búsqueda por nombre indiferente a mayúsculas y minúsculas
        } else if (req.query.ingredientes){
            const ingredientesArray = req.query.ingredientes.split(",").map(i => i.trim());
            filtro.ingredientes = {$in: ingredientesArray}; // Búsqueda por ingredientes
        } else if (req.query.dificultad){
            filtro.dificultad = {$regex: req.query.dificultad, $options: 'i'} // Búsqueda por dificultad
        }

        const alimentos = await collection.alimentos.find(filtro).toArray(); // Buscamos los alimentos en la colección

        res.json(alimentos); // Devolvemos los alimentos como respuesta en formato JSON

    } catch (error) {
        console.error("Error consultando alimentos:", error);
        res.status(500).json({ error: "Error consultando alimentos" });
    }
});



app.listen(PORT, () => {

    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`API de Ataraxia en funcionamiento`);

})
