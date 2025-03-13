//importo la connessione al db
const connection = require("../db");

//INDEX per recuperare tutti i film
function index(req, res) {

    const moviesSql = "SELECT * FROM movies;"

    connection.query(moviesSql, (err, result) => {
        //in caso di errore
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }

        //creo un nuovo array di oggetti film, mappando i risultati della query
        const movies = result.map(movie => {
            return {
                //copio le propietà dei film
                ...movie,
                //aggiungo percorso dell'immagine
                image: req.imagePath + movie.image
            };
        });

        //in caso di successo
        res.json(movies);
    });
};

//SHOW
function show(req, res) {
    //destructuring ID del film dai parametri della richiesta
    const { id } = req.params;

    //query per ottenere i dettagli del film specifico
    const movieSql = "SELECT * FROM movies WHERE id = ?";

    //query per ottenere le recensioni associate a quel film
    const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?";

    //eseguo la prima query per i dettagli del film
    connection.query(movieSql, [id], (err, movieResult) => {
        //gestione errore se la query non va a buon fine:
        if (err) return res.status(500).json({ error: "Database query failed" });
        //se il film non viene trovato:
        if (movieResult.length === 0) return res.status(404).json({ error: "Movie not found" });

        //estraggo il primo risultato della query
        const movie = movieResult[0];

        //aggiungo il percorso dell'immagine al film
        movie.image = req.imagePath + movie.image;

        //eseguo la seconda query per ottenere le recensioni
        connection.query(reviewsSql, [id], (err, reviewsResult) => {
            if (err) return res.status(500).json({ error: "Database query failed" });

            //aggiungo le recensioni ottenute all'oggetto del film
            movie.reviews = reviewsResult;

            //restituisco il film con dettagli e recensioni in JSON
            res.json(movie);
        });
    });
}

//inserimento nuova recensione
function storeReview(req, res) {

    //id film
    const { id } = req.params;

    //info: recensione, nome utente, voto film
    const { text, name, vote } = req.body

    //query per inserire la nuova recensione
    const insertReviewSql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)'

    //eseguo la query
    connection.query(insertReviewSql, [text, name, vote, id], (err, results) => {
        //gestione errore
        if (err) return res.status(500).json({ error: 'Database query failed' });
        //in caso di successo
        res.status(201);
        //restituisco messaggio di conferma in formato JSON con l'id della recensione appena inserita
        res.json({ message: 'Review added', id: results.insertId })
    });
}

//esporto index e show
module.exports = { index, show, storeReview };
