//importo il middleware multer per gestire l'upload dei file
const multer = require("multer");

//configuro il middleware per il salvataggio dei file
const storage = multer.diskStorage({

    destination: "./public/img/movies/",

    filename: (req, file, cb) => {
        //genero un nome univoco per ogni file e uso data attuale per non sovrascrivere file con nome uguale
        const uniqueName = `${Date.now()}-${file.originalname}`;

        //passo il nome del file alla callback per il salvataggio
        cb(null, uniqueName);
    }
});

//creo un'istanza di multer grazie alla configurazione definita prima
const upload = multer({ storage });

module.exports = upload;
