require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//importo CORS
const cors = require('cors');
//uso CORS
app.use(cors({ origin: process.env.FE_APP }));

//risorsa statica per le img
app.use(express.static("public"));

//middlewae per leggere il body delle richieste in JSON
app.use(express.json());

//importo il middleware che definisce il percorso delle immagini
const imagePathMiddleware = require("./middlewares/imagePath");
//uso il middleware per rendere disponibili in tutte le richieste
app.use(imagePathMiddleware);

//importo e uso la rotta dei film
const moviesRouter = require("./routers/movies");
app.use("/api/movies", moviesRouter);

// avvio del server sulla porta specificata
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
