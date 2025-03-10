//importo il modulo mysql per connettermi al database MySQL
const mysql = require('mysql2');

//creo la connessione al db con le variabili di ambiente
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//effettuo la connessione al db
connection.connect((err) => {
    if (err) throw err;
    //messaggio in caso di connessione avvenuta con successo
    console.error('Connected to MySQL!');
});

//esporto la connessione
module.exports = connection;
