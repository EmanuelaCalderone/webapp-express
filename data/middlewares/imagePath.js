//middleware per definire il percorso delle immagini
function imagePathMiddleware(req, res, next) {
    //aggiungo la proprietà "imagePath" all'oggetto req con il percorso delle immagini
    req.imagePath = "http://localhost:3000/img/movies_cover/";
    //passo la richista al middleware successivo
    next();
}

//esporto il middleware
module.exports = imagePathMiddleware;
