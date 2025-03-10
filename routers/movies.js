const express = require("express");
const router = express.Router();
//importo il controller dei film
const moviesController = require("../data/controllers/moviesController");

//INDEX
router.get("/", moviesController.index);

//SHOW
router.get("/:id", moviesController.show);


//esporto il modulo
module.exports = router;
