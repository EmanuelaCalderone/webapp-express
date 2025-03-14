const express = require("express");
const router = express.Router();
//importo il controller dei film
const moviesController = require("../data/controllers/moviesController");

//INDEX
router.get("/", moviesController.index);

//SHOW
router.get("/:id", moviesController.show);

//store review
router.post('/:id/reviews', moviesController.storeReview);

//store movie
//(richiesta POST per aggiungere un film tramite il middleware multer e poi passo i dati al controller `store`)
router.post('/', upload.single('image'), moviesController.store);

//esporto il modulo
module.exports = router;
